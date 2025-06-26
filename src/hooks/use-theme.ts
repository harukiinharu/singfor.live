import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return {
    theme,
    setTheme,
  }
}

export default useTheme
