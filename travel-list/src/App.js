import { useState } from 'react'
import Logo from './components/Logo'
import Form from './components/Form'
import Items from './components/Items'
import Stats from './components/Stats'

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

  function clearItems() {
    setItems([])
  }

  function deleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={addItem} />
      <Items
        items={items}
        onEditItem={editItem}
        onDeleteItem={deleteItem}
        onClearItems={clearItems}
      />
      <Stats items={items} />
    </div>
  )
}

export default App
