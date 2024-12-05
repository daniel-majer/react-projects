import { useRef } from 'react'
import { useKey } from '../custom-hooks/useKey'

function Search({ name, setQuery }) {
  const inputEl = useRef(null)

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return
    inputEl.current.focus()
    setQuery('')
  })

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={name}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

export default Search
