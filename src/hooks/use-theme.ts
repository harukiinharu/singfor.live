import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // 首先检查 localStorage
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme) {
        return savedTheme
      }
    }
    // 如果没有保存的主题，则使用系统偏好
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light' // SSR 默认返回 light
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)

    // 保存主题到 localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }

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
