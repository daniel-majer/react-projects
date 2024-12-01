import { useState } from 'react'
import Item from './Item'

export default function Items({
  items,
  onEditItem,
  onDeleteItem,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState('order')
  let sortedItems = []

  if (sortBy === 'order') sortedItems = items

  if (sortBy === 'description')
    sortedItems = [...items].sort((a, b) =>
      a.description.toLowerCase().localeCompare(b.description.toLowerCase())
    )

  if (sortBy === 'status')
    sortedItems = [...items].sort((a, b) => b.packed - a.packed)

  return (
    <div className='list'>
      <ul>
        {sortedItems.map(item => (
          <Item
            key={item.id}
            item={item}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>

      <div className='actions'>
        <select onChange={e => setSortBy(e.target.value)}>
          <option value='order'>sort by input order</option>
          <option value='description'>sort by description</option>
          <option value='status'>sort by packed status</option>
        </select>
        <button onClick={onClearItems}>clear list</button>
      </div>
    </div>
  )
}
