import Friend from './Friend'

export default function Sidebar({ friends, onSelect, selected, children }) {
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
      {children}
    </div>
  )
}
