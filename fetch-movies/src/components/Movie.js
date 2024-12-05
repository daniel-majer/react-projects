function Movie({ movie, setSelectedId }) {
  const { imdbID: id, Poster: poster, Title: title, Year: year } = movie

  return (
    <li onClick={() => setSelectedId(oldId => (oldId === id ? null : id))}>
      {poster !== 'N/A' ? <img src={poster} alt={title} /> : <span>🎬</span>}
      <h3>{title}</h3>
      <p>Year: {year}</p>
    </li>
  )
}

export default Movie
