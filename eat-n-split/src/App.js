import { useState } from 'react'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

function Button({ text, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {text}
    </button>
  )
}

function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [selected, setSelected] = useState('')
  const [toggleAdd, setToggleAdd] = useState(false)

  function handleSelect(friend) {
    setSelected(selected => (selected.id === friend.id ? '' : friend))
    setToggleAdd(toggleAdd => (toggleAdd === true ? !toggleAdd : toggleAdd))
  }

  /* function findFriend() {
    return friends.find(f => f.id === selected.id)
  } */

  function handleBill(friendExpense, who) {
    if (!friendExpense) return
    let newOwe

    newOwe =
      who === 'me'
        ? selected.balance + friendExpense
        : selected.balance - friendExpense

    const friend = { ...selected, balance: newOwe }
    const newFriends = friends.map(f => (f.id === selected.id ? friend : f))
    setFriends(newFriends)
  }

  return (
    <div className='app'>
      <Sidebar
        friends={friends}
        onSelect={handleSelect}
        selected={selected}
        setToggleAdd={setToggleAdd}
        toggleAdd={toggleAdd}
      />
      <SplitBill friends={friends} selected={selected} onBill={handleBill} />
    </div>
  )
}

function Sidebar({ friends, onSelect, selected, setToggleAdd, toggleAdd }) {
  return (
    <div className='sidebar'>
      <ul>
        {friends.map(friend => {
          return (
            <Friend
              key={friend.id}
              friend={friend}
              onSelect={onSelect}
              selected={selected}
            />
          )
        })}
      </ul>

      {toggleAdd && (
        <form action='form-add-friend'>
          <label>👫 Friend name</label>
          <input type='text' />
          <label>🌄 Image URL</label>
          <input type='text' defaultValue='https://i.pravatar.cc/48' />
          <Button text='Add' />
        </form>
      )}

      <Button
        text={toggleAdd ? 'Close' : 'Add friend'}
        onClick={() => setToggleAdd(toggleAdd => !toggleAdd)}
      />
    </div>
  )
}

function Friend({ friend, onSelect, selected }) {
  const { name, balance, image } = friend

  return (
    <li className={selected.id === friend.id ? 'selected' : ''}>
      <img src={image} alt='Person' />
      <div>
        <h3>{name}</h3>
        <p className={balance < 0 ? 'red' : balance > 0 ? 'green' : ''}>
          {name} owes you {balance}€
        </p>
      </div>
      <Button
        text={selected.id === friend.id ? 'Close' : 'Select'}
        onClick={() => onSelect(friend)}
      />
    </li>
  )
}

function SplitBill({ friends, selected, onBill }) {
  const [bill, setBill] = useState('')
  const [expense, setExpense] = useState('')
  const [who, setWho] = useState('me')
  const friend = friends.find(f => f.id === selected.id)
  const friendExpense = bill - expense || ''

  function handleForm(e) {
    e.preventDefault()
    onBill(friendExpense, who)
  }

  function checkExpense(e) {
    if (bill - Number(e.target.value) < 0) return
    setExpense(e.target.value)
  }

  return (
    selected && (
      <form className='form-split-bill' onSubmit={handleForm}>
        <h2>Split a bill with {selected.name}</h2>
        <label>💰 Bill value </label>
        <input
          type='text'
          onChange={e => setBill(+e.target.value)}
          value={bill}
        />
        <label>🧍‍♀️ Your expense</label>
        <input type='text' onChange={checkExpense} value={expense} />
        <label>👫 {friend.name}'s expense</label>
        <input type='text' disabled defaultValue={friendExpense} />
        <label>🤑 Who is paying the bill</label>
        <select value={who} onChange={e => setWho(e.target.value)}>
          <option value='me'>You</option>
          <option value='you'>{friend.name}</option>
        </select>
        <Button text='Split bill' />
      </form>
    )
  )
}

export default App
