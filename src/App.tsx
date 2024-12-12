import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import LyricPlayer from './LyricPlayer'
import Sidebar from './Sidebar'
import { loadLyricJson } from './lyricUtils'

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
      window.location.href = '#/生きていたんだよな'
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
      <Sidebar />
      <div id='container'>
        <audio
          id='mainaudio'
          ref={audioRef}
          controls
        />
        {isNotFound ? (
          <h1 style={{ textAlign: 'center' }}>404 - Lyric Not Found</h1>
        ) : (
          lyricJson && (
            <LyricPlayer audio={audioRef.current!} lyricJson={lyricJson} />
          )
        )}
      </div>
    </>
  )
}

export default App
