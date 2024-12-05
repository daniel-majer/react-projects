function Movie({ movie, setMovieId }) {
  const { imdbID: id, Poster: poster, Title: title, Year: year } = movie

  return (
    <li onClick={() => setMovieId(oldId => (oldId === id ? null : id))}>
      {poster !== 'N/A' ? <img src={poster} alt={title} /> : <span>🎬</span>}
      <h3>{title}</h3>
      <p>Year: {year}</p>
    </li>
  )
}

export default Movie
