import { useState, useEffect } from 'react'

import NumResults from './components/NumResults'
import Search from './components/Search'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import Summary from './components/Summary'
import Box from './components/Box'
import MovieDetail from './components/MovieDetail'
import Movie from './components/Movie'
import Watched from './components/Watched'

import { useFetch } from './custom-hooks/useFetch'
import { useStorage } from './custom-hooks/useStorage'

function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [movieList, setMovieList] = useStorage([], 'watched')

  const [movies, isLoading, isError] = useFetch(query)

  function addMovie(newMovie) {
    setMovieList(movies => [...movies, newMovie])
    setSelectedId('')
  }

  function deleteMovie(id) {
    setMovieList(movies => movies.filter(movie => movie.id !== id))
  }

  return (
    <>
      <Navigation>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navigation>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {isError && <ErrorMessage />}
          {!isLoading && !isError && (
            <Movies movies={movies} setSelectedId={setSelectedId} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              movieList={movieList}
              setSelectedId={setSelectedId}
              addMovie={addMovie}
            />
          ) : (
            <>
              <Summary movieList={movieList} />
              <Watched movieList={movieList} deleteMovie={deleteMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

function Navigation({ children }) {
  return (
    <nav className='nav-bar'>
      <div className='logo'>
        <span>🍿</span>
        <h1>Movies</h1>
      </div>

      {children}
    </nav>
  )
}

function Main({ children }) {
  return <main className='main'>{children}</main>
}

function Movies({ movies, setSelectedId }) {
  return (
    <ul className='list list-movies'>
      {movies?.map(movie => (
        <Movie key={movie.imdbID} movie={movie} setSelectedId={setSelectedId} />
      ))}
    </ul>
  )
}

export default App
