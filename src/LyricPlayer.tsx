import { useEffect, useRef, useState } from 'react'
import { getCurrentLine } from './lyricUtils'

interface LyricPlayerProps {
  audio: HTMLAudioElement
  lyricTime: number[]
  lyricJson: Record<string, string[]>
}

export function LyricPlayer({ audio, lyricTime, lyricJson }: LyricPlayerProps) {
  const [currentLine, setCurrentLine] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const pHeight = (20 + 16) * 5
  const tyMax = 2 * pHeight

  useEffect(() => {
    const handleTimeUpdate = () => {
      const newCurrentLine = getCurrentLine(lyricTime, audio.currentTime)
      setCurrentLine(newCurrentLine)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
  }, [audio, lyricTime])

  const translateY = -currentLine * pHeight
  const finalTranslateY = -translateY > tyMax ? translateY + tyMax : 0
  return (
    <div id='container' ref={containerRef}>
      <ul
        className='lyriclist'
        style={{ transform: `translateY(${finalTranslateY}px)` }}
      >
        {Object.keys(lyricJson).map((key, index) => (
          <li key={index} className={index === currentLine ? 'on' : ''}>
            {lyricJson[key].map((line: string, i: number) => (
              <p key={i}>{line}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
