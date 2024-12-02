import Button from './Button'

export default function Friend({ friend, onSelect, selected }) {
  const { name, balance, image } = friend

  return (
    <li className={selected.id === friend.id ? 'selected' : ''}>
      <img src={image} alt='Person' />
      <div>
        <h3>{name}</h3>
        <p className={balance < 0 ? 'red' : balance > 0 ? 'green' : ''}>
          {balance > 0 && `${name} owes you ${balance}`}
          {balance < 0 && `You owe ${name} ${balance}€`}
          {balance === 0 && `You and ${name} are even`}
        </p>
      </div>
      <Button
        text={selected.id === friend.id ? 'Close' : 'Select'}
        onClick={() => onSelect(friend)}
      />
    </li>
  )
}
