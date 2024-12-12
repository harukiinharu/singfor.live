import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import LyricPlayer from './LyricPlayer'
import { loadLyricJson } from './lyricUtils'

const App: React.FC = () => {
  const [lyricJson, setLyricJson] = useState<Record<string, string[]> | null>(
    null
  )
  const [isNotFound, setIsNotFound] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const location = useLocation()

  useEffect(() => {
    const lyricName = location.pathname.slice(1) || '生きていたんだよな'

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
      {isNotFound ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <h1>404 - Lyric Not Found</h1>
        </div>
      ) : (
        lyricJson && (
          <LyricPlayer audio={audioRef.current!} lyricJson={lyricJson} />
        )
      )}
      <audio
        id='mainaudio'
        ref={audioRef}
        controls
        style={{ display: isNotFound ? 'none' : 'block' }}
      />
    </>
  )
}

export default App
