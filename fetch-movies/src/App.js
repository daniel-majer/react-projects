import { useState } from 'react'

import NumResults from './components/NumResults'
import Search from './components/Search'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import Summary from './components/Summary'
import Box from './components/Box'
import MovieDetail from './components/MovieDetail'
import Movie from './components/Movie'

import { useFetch } from './custom-hooks/useFetch'

function App() {
  const [query, setQuery] = useState('')
  const [movieId, setMovieId] = useState(null)

  const [data, isLoading, isError] = useFetch(query)

  return (
    <>
      <Navigation>
        <Search query={query} setQuery={setQuery} />
        <NumResults data={data} />
      </Navigation>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {isError && <ErrorMessage />}
          {!isLoading && !isError && (
            <Movies data={data} setMovieId={setMovieId} />
          )}
        </Box>
        <Box>{movieId ? <MovieDetail movieId={movieId} /> : <Summary />}</Box>
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

function Movies({ data, setMovieId }) {
  return (
    <ul className='list list-movies'>
      {data?.map(movie => (
        <Movie key={movie.imdbID} movie={movie} setMovieId={setMovieId} />
      ))}
    </ul>
  )
}

export default App
