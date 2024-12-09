import { useEffect, useRef, useState } from 'react'
import LyricPlayer from './LyricPlayer'
import { getLyricTime } from './lyricUtils'

const App: React.FC = () => {
  const [lyricData, setLyricData] = useState<{
    lyricTime: number[]
    lyricJson: Record<string, string[]>
  } | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const lyricName =
      new URLSearchParams(window.location.search).get('name') || '少年少女'

    fetch(`./lyric/${lyricName}.json`)
      .then(res => res.json())
      .then(lyricJson => {
        const lyricTime = getLyricTime(lyricJson)
        setLyricData({ lyricTime, lyricJson })
      })
      .catch(error => {
        console.error(`Error: lyric not found: ${lyricName}`)
      })

    if (audioRef.current) {
      audioRef.current.src = `./audio/${lyricName}.mp3`
      audioRef.current.volume = 0.5
    }
  }, [])

  return (
    <>
      {lyricData && (
        <LyricPlayer
          audio={audioRef.current!}
          lyricTime={lyricData.lyricTime}
          lyricJson={lyricData.lyricJson}
        />
      )}
      <audio id='mainaudio' ref={audioRef} controls />
    </>
  )
}

export default App
