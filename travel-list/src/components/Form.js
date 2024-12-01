import { useState } from 'react'

export default function Form({ onAddItem }) {
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()
    if (!item) return
    const newItem = {
      id: crypto.randomUUID(),
      description: item,
      quantity: quantity,
      packed: false,
    }

    onAddItem(newItem)
    setItem('')
    setQuantity(1)
  }
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select onChange={e => setQuantity(+e.target.value)} value={quantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        onChange={e => setItem(e.target.value)}
        value={item}
        type='text'
        placeholder='Item...'
      />
      <button>add</button>
    </form>
  )
}
