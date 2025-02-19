import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import Player from '@/components/Player'
import GithubLink from '@/components/GithubLink'
import '@/global.css'

const App = () => {
  return (
    <HashRouter>
      <GithubLink />
      <div className='flex justify-center min-h-screen'>
        <div className='flex'>
          <Sidebar />
          <Player />
        </div>
      </div>
    </HashRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
