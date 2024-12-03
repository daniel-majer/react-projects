function Search({ name, setName }) {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={name}
      onChange={e => setName(e.target.value)}
    />
  )
}

export default Search
