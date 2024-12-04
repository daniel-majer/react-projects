import { useState, useEffect } from 'react'

import NumResults from './components/NumResults'
import Search from './components/Search'

const API_KEY = 'c89ff9ce'

function App() {
  const [name, setName] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true)
      setIsError('')

      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${name}`
        )
        if (!response.ok) throw new Error('Something went wrong!')
        const data = await response.json()
        if (data.Response === 'False') throw new Error(data.Error)

        setMovies(data.Search)
      } catch (error) {
        setIsError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (name.length < 3) {
      setMovies([])
      setIsError('')
      return
    }

    fetchMovies()
  }, [name])

  return (
    <>
      <Navigation>
        <Search name={name} setName={setName} />
        <NumResults movies={movies} />
      </Navigation>
      <Main>
        <Box>
          {isLoading && <p>LOADING...</p>}
          {isError && <p>{isError}</p>}
          {!isLoading && !isError && <Movies movies={movies} />}
        </Box>
        <Box />
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

function Box({ children }) {
  const [toggle, setToggle] = useState(true)
  return (
    <div className='box'>
      <button onClick={() => setToggle(!toggle)} className='btn-toggle'>
        {toggle ? '–' : '+'}
      </button>
      {toggle ? children : null}
    </div>
  )
}

function Movies({ movies }) {
  /*   console.log(movies?.Search?.[0].Title)
   */ return (
    <ul className='list list-movies'>
      {movies?.map(movie => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  )
}

function Movie({ movie }) {
  const { Poster: poster, Title: title, Year: year } = movie
  return (
    <li>
      {poster !== 'N/A' ? <img src={poster} alt={title} /> : <span>🎬</span>}
      <h3>{title}</h3>
      <p>Year: {year}</p>
    </li>
  )
}

export default App
