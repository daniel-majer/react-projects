import { useEffect, useState } from 'react'
import Loading from './Loading'
import StarRating from './StarRating'

const API_KEY = 'c89ff9ce'

function MovieDetail({ movieId }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true)
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
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
  }, [movieId])

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie

  console.log(movie)

  return isLoading ? (
    <Loading />
  ) : (
    <div className='details'>
      <header>
        <button className='btn-back'>←</button>
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
          <StarRating maxRating={10} size={24} onSetRating={setUserRating} />{' '}
        </div>
        <p>{plot}</p>
        <p>{actors}</p>
        <p>{director}</p>
      </section>
    </div>
  )
}

export default MovieDetail
