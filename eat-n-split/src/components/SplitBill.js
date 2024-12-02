import { useState } from 'react'
import Button from './Button'

export default function SplitBill({ selected, onBill }) {
  const [bill, setBill] = useState('')
  const [expense, setExpense] = useState('')
  const [who, setWho] = useState('me')

  const friendExpense = bill - expense || ''

  function handleForm(e) {
    e.preventDefault()
    if (!expense || !expense) return

    let balance

    if (who === 'me') balance = selected.balance + friendExpense
    if (who === 'friend') balance = selected.balance - expense

    onBill(balance)
  }

  function checkExpense(e) {
    if (bill - Number(e.target.value) < 0) return
    setExpense(e.target.value)
  }

  return (
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
      <label>👫 {selected.name}'s expense</label>
      <input type='text' disabled defaultValue={friendExpense} />
      <label>🤑 Who is paying the bill</label>
      <select value={who} onChange={e => setWho(e.target.value)}>
        <option value='me'>You</option>
        <option value='friend'>{selected.name}</option>
      </select>
      <Button text='Split bill' />
    </form>
  )
}
