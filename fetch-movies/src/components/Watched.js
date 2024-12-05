function Watched({ movieList, deleteMovie }) {
  return (
    <ul className='list'>
      {movieList.map(movie => {
        return (
          <li key={movie.id}>
            <img src={movie.poster} alt='' />
            <h3>{movie.title}</h3>
            <div>
              <p>⭐️ {movie.imdbRating}</p>
              <p>🌟 {movie.userRating}</p>
              <p>⏳ {movie.runtime}</p>
              <button className='btn-delete' onClick={() => deleteMovie(movie.id)}>X</button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Watched
