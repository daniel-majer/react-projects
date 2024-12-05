import { useState, useEffect } from 'react'

const API_KEY = 'c89ff9ce'

export function useFetch(query) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function fetchMovies() {
      setIsLoading(true)
      setIsError('')

      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal }
        )
        if (!response.ok) throw new Error('Something went wrong!')
        const data = await response.json()
        if (data.Response === 'False') throw new Error(data.Error)

        setData(data.Search)
        setIsError('')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setIsError(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setData([])
      setIsError('')
      return
    }

    fetchMovies()

    return function () {
      controller.abort()
    }
  }, [query])

  return [data, isLoading, isError]
}
