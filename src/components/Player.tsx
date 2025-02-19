import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LyricPlayer from '@/components/LyricPlayer'
import { loadLyricJson } from '@/lyricUtils'
import { useIsMobile } from '@/useMobile'
import { MobileSidebar } from '@/components/Sidebar'

const Player: React.FC = () => {
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

  const isMobile = useIsMobile()

  return (
    <div className='max-w-[80vw]'>
      <div className='sticky flex flex-col justify-center top-0 py-[30px] bg-background transition-colors duration-500 z-1'>
        {isMobile ? <MobileSidebar /> : <></>}
        <audio className='w-full' ref={audioRef} controls />
      </div>
      <div className='flex justify-center'>
        {isNotFound ? (
          <h1 className='text-center'>404 - Lyric Not Found</h1>
        ) : (
          lyricJson && (
            <LyricPlayer audio={audioRef.current!} lyricJson={lyricJson} />
          )
        )}
      </div>
    </div>
  )
}

export default Player
