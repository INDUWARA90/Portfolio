import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem('portfolio-theme') || 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
