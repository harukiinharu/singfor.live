import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LyricPlayer from '@/components/LyricPlayer'
import Sidebar from '@/components/Sidebar'
import { loadLyricJson } from '@/lib/lyricUtils'
import GithubLink from '@/components/GithubLink'

const App: React.FC = () => {
  const [lyricJson, setLyricJson] = useState<Record<string, string[]> | null>(
    null
  )
  const [isNotFound, setIsNotFound] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const location = useLocation()

  useEffect(() => {
    const lyricName = location.pathname.slice(1)
    if (lyricName === '') {
      window.location.href = '#/iki'
      return
    }

    loadLyricJson(lyricName).then(result => {
      if (result) {
        setLyricJson(result)
        setIsNotFound(false)
        if (audioRef.current) {
          audioRef.current.src = `./audio/${lyricName}.mp3`
          audioRef.current.volume = 0.5
          audioRef.current.load()
        }
      } else {
        if (audioRef.current) {
          audioRef.current.src = ''
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
        setLyricJson(null)
        setIsNotFound(true)
      }
    })
  }, [location])

  return (
    <>
      <GithubLink />
      <div className='flex justify-center min-h-screen'>
        <div className='flex'>
          <Sidebar />
          <div className='w-[600px]'>
            <div className='sticky top-0 bg-white py-[30px] z-10'>
              <audio className='w-full' ref={audioRef} controls />
            </div>
            <div className='w-full'>
              {isNotFound ? (
                <h1 className='text-center'>404 - Lyric Not Found</h1>
              ) : (
                lyricJson && (
                  <LyricPlayer
                    audio={audioRef.current!}
                    lyricJson={lyricJson}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
