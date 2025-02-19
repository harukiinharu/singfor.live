import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import Player from '@/components/Player'
import GithubLink from '@/components/GithubLink'
import '@/global.css'
import useTheme from '@/useTheme'
import { useIsMobile } from '@/useMobile'

const App = () => {
  useTheme()
  const isMobile = useIsMobile()
  return (
    <HashRouter>
      {isMobile ? <></> : <GithubLink />}
      <div className='flex justify-center min-h-screen'>
        <div className='flex'>
          {isMobile ? <></> : <Sidebar />}
          <Player />
        </div>
      </div>
    </HashRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
