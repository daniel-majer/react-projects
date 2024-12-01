import { useState } from 'react'

/* const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
] */

function App() {
  const [items, setItems] = useState([])

  function addItem(item) {
    setItems(items => [...items, item])
  }

  function editItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  function deleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  return (
    <div className='app'>
      <Logo />
      <AddItems onAddItem={addItem} />
      <Items items={items} onEditItem={editItem} onDeleteItem={deleteItem} />
      <Footer />
    </div>
  )
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>
}

function AddItems({ onAddItem }) {
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

function Items({ items, onEditItem, onDeleteItem }) {
  return (
    <div className='list'>
      <ul>
        {items.map(item => (
          <Item
            key={item.id}
            item={item}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
      <div className='actions'>
        <select>
          <option value='1'>sort by input order</option>
          <option value='1'>sort by description</option>
          <option value='1'>sort by packed status</option>
        </select>
        <button>clear list</button>
      </div>
    </div>
  )
}

function Item({ item, onEditItem, onDeleteItem }) {
  return (
    <li>
      <input
        onChange={() => onEditItem(item.id)}
        type='checkbox'
        value={item.packed}
      />

      <span style={{textDecoration: item.packed && 'line-through' }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Footer() {
  return (
    <div>
      <p className='stats'>Start adding some items to your packing list 🚀</p>
    </div>
  )
}

export default App
