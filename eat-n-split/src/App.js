import { useState } from 'react'
import Button from './components/Button'
import Sidebar from './components/Sidebar'
import SplitBill from './components/SplitBill'
import { initialFriends } from './initialData'

function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [selected, setSelected] = useState('')
  const [toggleAdd, setToggleAdd] = useState(false)

  function handleSelect(friend) {
    setSelected(selected => (selected.id === friend.id ? '' : friend))
    setToggleAdd(toggleAdd => (toggleAdd === true ? !toggleAdd : toggleAdd))
  }

  function handleBill(balance) {
    if (!balance) return
    const updateFriends = friends.map(f =>
      f.id === selected.id ? { ...f, balance: balance } : f
    )
    setFriends(updateFriends)
    setSelected('')
  }

  function handleAddFriend(newFriend) {
    setFriends(friends => [...friends, newFriend])
    setToggleAdd(toggleAdd => !toggleAdd)
  }

  return (
    <div className='app'>
      <Sidebar friends={friends} onSelect={handleSelect} selected={selected}>
        {toggleAdd && <AddForm onAddFriend={handleAddFriend} />}
        <Button
          text={toggleAdd ? 'Close' : 'Add friend'}
          onClick={() => setToggleAdd(toggleAdd => !toggleAdd)}
        />
      </Sidebar>

      {selected && (
        <SplitBill key={selected.id} selected={selected} onBill={handleBill} />
      )}
    </div>
  )
}

function AddForm({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  function addNew(e) {
    e.preventDefault()
    if (!name || !image) return

    const id = crypto.randomUUID()

    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    }

    onAddFriend(newFriend)
  }

  return (
    <form action='form-add-friend'>
      <label>👫 Friend name</label>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
      <label>🌄 Image URL</label>
      <input
        type='text'
        defaultValue={image}
        onChange={e => setImage(e.target.value)}
      />
      <Button text='Add' onClick={addNew} />
    </form>
  )
}

export default App
