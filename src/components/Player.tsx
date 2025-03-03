import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LyricPlayer from '@/components/LyricPlayer'
import { loadLyricJson } from '@/lyricUtils'
import useIsMobile from '@/hooks/use-mobile'
import { MobileSidebar } from '@/components/Sidebar'
import { cn } from '@/lib/utils'

const Player: React.FC<{ lyricId: string }> = ({ lyricId }) => {
  const [lyricJson, setLyricJson] = useState<Record<string, string[]> | null>(
    null
  )
  const audioRef = useRef<HTMLAudioElement>(null)
  const location = useLocation()
  useEffect(() => {
    loadLyricJson(lyricId).then(result => {
      if (result) {
        setLyricJson(result)
        if (audioRef.current) {
          audioRef.current.src = `./audio/${lyricId}.mp3`
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
      }
    })
  }, [location])

  const isMobile = useIsMobile()

  return (
    <div className='max-w-[80vw]'>
      <div
        className={cn(
          'sticky flex flex-col justify-center',
          'top-0 pt-[36px] pb-[30px] bg-background z-1'
        )}
      >
        {isMobile && <MobileSidebar />}
        <audio className='w-full' ref={audioRef} controls />
      </div>
      <div className='flex justify-center'>
        {lyricJson ? (
          <LyricPlayer audio={audioRef.current!} lyricJson={lyricJson} />
        ) : (
          <h1 className='w-[600px] text-center'>404 - Lyric Not Found</h1>
        )}
      </div>
    </div>
  )
}

export default Player
