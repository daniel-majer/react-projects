export default function Stats({ items }) {
  const numPacked = items.filter(item => item.packed).length
  const numItems = items.length

  return (
    <div>
      <p className='stats'>
        {!numItems
          ? 'Start adding some items to your packing list 🚀'
          : items
          ? `💼 You have ${numItems} items on your list, and you already ${
              numPacked ? numPacked : '0'
            } packed  (${Math.ceil((numPacked / numItems) * 100)}%)`
          : 'You got everything! Ready to go ✈️'}
      </p>
    </div>
  )
}
