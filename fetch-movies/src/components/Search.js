import { useEffect, useRef } from 'react'

function Search({ name, setName }) {
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current.focus()
    function keyPress(e) {
      if (document.activeElement === inputEl.current) return
      if (e.key === 'Enter') {
        inputEl.current.focus()
        setName('')
      }
    }
    document.addEventListener('keydown', keyPress)

    return () => {
      document.removeEventListener('keydown', keyPress)
    }
  }, [setName])

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={name}
      onChange={e => setName(e.target.value)}
      ref={inputEl}
    />
  )
}

export default Search
