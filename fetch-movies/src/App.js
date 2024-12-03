import { useState, useEffect } from 'react'

import NumResults from './components/NumResults'
import Search from './components/Search'

const API_KEY = 'f84fc31'

function App() {
  const [name, setName] = useState('')
  const [movies, setMovies] = useState('')

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}d&s=${name}`
        )
        const movies = await response.json()
        setMovies(movies)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMovies()

    /*   return () => {
      second
    } */
  }, [name])

  return (
    <>
      <Navigation>
        <Search name={name} setName={setName} />
        <NumResults />
      </Navigation>
      <Movies>
        <Box />
        <Box />
      </Movies>
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

function Movies({ children }) {
  return <main className='main'>{children}</main>
}

function Box() {
  return (
    <div className='box'>
      <button className='btn-toggle'>–</button>
    </div>
  )
}

export default App
