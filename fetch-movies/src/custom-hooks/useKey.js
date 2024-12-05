import { useEffect } from 'react'

export function useKey(key, action) {
  useEffect(() => {
    function keyPress(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action()
      }
    }
    document.addEventListener('keydown', keyPress)

    return () => {
      document.removeEventListener('keydown', keyPress)
    }
  }, [action, key])
}
