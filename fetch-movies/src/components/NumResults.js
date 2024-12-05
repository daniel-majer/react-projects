function NumResults({ data }) {
  return (
    <p className='num-results'>
      Found <strong>{data.length}</strong> results
    </p>
  )
}

export default NumResults
