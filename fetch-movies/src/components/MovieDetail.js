import { useEffect, useState } from 'react'
import Loading from './Loading'
import StarRating from './StarRating'
import { useKey } from '../custom-hooks/useKey'

const API_KEY = 'c89ff9ce'

function MovieDetail({ selectedId, movieList, setSelectedId, addMovie }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')
  const isRating = movieList.find(movie => selectedId === movie.id)

  useKey('Escape', function () {
    setSelectedId('')
  })

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true)
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        )
        if (!response.ok) throw new Error('Something went wrong!')

        const data = await response.json()

        setMovie(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [selectedId])

  const {
    Title: title,
    /*     Year: year,
     */ Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie

  function createMovie() {
    const newMovie = {
      id: selectedId,
      title,
      poster,
      imdbRating,
      userRating,
      runtime,
    }

    addMovie(newMovie)
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className='details'>
      <header>
        <button className='btn-back' onClick={() => setSelectedId('')}>
          ←
        </button>
        <img src={poster} alt='Movie poster' />
        <div className='details-overview'>
          <h2>{title}</h2>
          <p>{`${released} • ${runtime}`}</p>
          <p>{genre}</p>
          <p>{`⭐️ ${imdbRating} IMDb rating`}</p>
        </div>
      </header>
      <section>
        <div className='rating'>
          {isRating ? (
            <p>Your rating is {isRating.userRating} ⭐️</p>
          ) : (
            <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
          )}
          {userRating && (
            <button className='btn-add' onClick={createMovie}>
              + Add to list
            </button>
          )}
        </div>
        <p>{plot}</p>
        <p>{actors}</p>
        <p>{director}</p>
      </section>
    </div>
  )
}

export default MovieDetail
