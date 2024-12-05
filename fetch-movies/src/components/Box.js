import { useState } from 'react'

function Box({ children }) {
  const [toggle, setToggle] = useState(true)
  return (
    <div className='box'>
      <button onClick={() => setToggle(!toggle)} className='btn-toggle'>
        {toggle ? '–' : '+'}
      </button>
      {toggle ? children : null}
    </div>
  )
}
export default Box
