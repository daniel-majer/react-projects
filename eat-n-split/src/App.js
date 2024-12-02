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

  return (
    <div className='app'>
      <Sidebar friends={friends} />
      <SplitBill friends={friends} />
    </div>
  )
}

function Sidebar({ friends }) {
  const [toggle, setToggle] = useState(false)

  function showAdd() {
    setToggle(toggle => !toggle)
  }
  return (
    <div className='sidebar'>
      <ul>
        {friends.map(friend => {
          return <Friend key={friend.id} friend={friend} />
        })}
      </ul>

      {toggle && (
        <form action='form-add-friend'>
          <label>👫 Friend name</label>
          <input type='text' />
          <label>🌄 Image URL</label>
          <input type='text' defaultValue='https://i.pravatar.cc/48' />
          <Button text='Add' />
        </form>
      )}

      <Button text={toggle ? 'Close' : 'Add friend'} onClick={showAdd} />
    </div>
  )
}

function Friend({ friend }) {
  const { name, balance, image } = friend

  return (
    <li>
      <img src={image} alt='Person' />
      <div>
        <h3>{name}</h3>
        <p className={balance < 0 ? 'red' : balance > 0 ? 'green' : ''}>
          {name} owes you {balance}€
        </p>
      </div>
      <Button text='Select' />
    </li>
  )
}

function SplitBill({}) {
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with Anthony</h2>
      <label>💰 Bill value </label>
      <input type='text' />
      <label>🧍‍♀️ Your expense</label>
      <input type='text' />
      <label>👫 's expense</label>
      <input type='text' disabled />
      <label>🤑 Who is paying the bill</label>
      <input type='text' />
      <Button text='Split bill' />
    </form>
  )
}

export default App
