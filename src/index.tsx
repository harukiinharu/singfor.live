import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import Player from '@/components/Player'
import GithubLink from '@/components/GithubLink'
import useTheme from '@/hooks/use-theme'
import useIsMobile from '@/hooks/use-mobile'
import lyricNamesMap from '@/routes'
import NotFound from '@/components/NotFound'
import '@/global.css'

const App: React.FC = () => {
  useTheme()
  const isMobile = useIsMobile()
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/ikite' />} />
        <Route path='*' element={<NotFound />} />
        {lyricNamesMap.map(route => (
          <Route
            key={route.id}
            path={`/${route.id}`}
            element={
              <>
                {!isMobile && <GithubLink />}
                <div className='flex justify-center min-h-screen'>
                  <div className='flex'>
                    {!isMobile && <Sidebar />}
                    <Player lyricId={route.id} />
                  </div>
                </div>
              </>
            }
          />
        ))}
      </Routes>
    </HashRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
