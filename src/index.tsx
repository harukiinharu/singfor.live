import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from '@/components/App'
import '@/global.css'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>
)
