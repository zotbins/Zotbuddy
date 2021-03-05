import { useState, useEffect } from 'react'
import axios from 'axios'

const useApi = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      axios.get(url).then(res => {
        if (res.status === 200) {
          setData(res.data)
        } else {
          setError(res.error)
        }
      })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    return { error, loading, data }
  }, [])
}