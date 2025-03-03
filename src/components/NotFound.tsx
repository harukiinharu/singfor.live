import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const [countdown, setCountdown] = useState(5)
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [countdown])
  useEffect(() => {
    if (countdown === 0) {
      navigate('/')
    }
  }, [countdown, navigate])
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className='text-2xl'>404 - Page Not Found</h1>
      <p>
        return in <span>{countdown}</span> seconds
      </p>
    </div>
  )
}

export default NotFound
