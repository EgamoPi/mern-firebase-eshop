/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

import { useState, useEffect, createElement as $ } from 'react'
import { useHistory } from 'react-router-dom'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5)
  const history = useHistory()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    if (count === 0) history.push('/')

    return () => clearInterval(interval)
  }, [count])

  return $(
    'div',
    { className: 'container p-5 text-center' },
    $('p', null, `Redirecting in ${count} seconds`),
  )
}

export default LoadingToRedirect
