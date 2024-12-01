export default function Item({ item, onEditItem, onDeleteItem }) {
  return (
    <li>
      <input
        onChange={() => onEditItem(item.id)}
        type='checkbox'
        value={item.packed}
      />

      <span style={{ textDecoration: item.packed && 'line-through' }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}
