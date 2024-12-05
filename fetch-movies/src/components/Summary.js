function Summary({ movieList }) {
  /*   const { id, title, poster, imdbRating, userRating, runtime } = movieList
   */
  const totalRuntime = total('runtime')
  const totalImdbRating = total('imdbRating')
  const totalUserRating = total('userRating')
  const averageImdbRating = Number(
    (totalImdbRating / movieList.length).toFixed(2)
  )
  const averageUserRating = Number(
    (totalUserRating / movieList.length).toFixed(2)
  )
  function total(value) {
    const totalValue = movieList.reduce(
      (acc, curr) => parseInt(curr[value]) + acc,
      0
    )
    return totalValue
  }

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{movieList.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{averageImdbRating || 0}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{averageUserRating || 0}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.ceil(totalRuntime)} min</span>
        </p>
      </div>
    </div>
  )
}

export default Summary
