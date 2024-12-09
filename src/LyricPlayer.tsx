import { useEffect, useRef, useState } from 'react'
import { getCurrentLine } from './lyricUtils'

interface LyricPlayerProps {
  audio: HTMLAudioElement
  lyricJson: Record<string, string[]>
}

const LyricPlayer: React.FC<LyricPlayerProps> = ({ audio, lyricJson }) => {
  const [currentLineIdx, setCurrentLine] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const pHeight = (20 + 16) * 5
  const tyMax = 2 * pHeight

  useEffect(() => {
    const handleTimeUpdate = () => {
      const newLineIdx = getCurrentLine(
        Object.keys(lyricJson).map(timestamp => {
          return (
            parseFloat(timestamp.substring(1, 3)) * 60 +
            parseFloat(timestamp.substring(4, 10))
          )
        }),
        audio.currentTime
      )
      if (newLineIdx !== currentLineIdx) {
        // console.log(`cur:${currentLineIdx}, new:${newLineIdx}`)
        setCurrentLine(newLineIdx)
      }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
  }, [currentLineIdx])

  const translateY = -currentLineIdx * pHeight
  const finalTranslateY = -translateY > tyMax ? translateY + tyMax : 0
  return (
    <div id='container' ref={containerRef}>
      <ul
        className='lyriclist'
        style={{ transform: `translateY(${finalTranslateY}px)` }}
      >
        {Object.keys(lyricJson).map((key, index) => (
          <li key={index} className={index === currentLineIdx ? 'on' : ''}>
            {lyricJson[key].map((line: string, i: number) => (
              <p key={i}>{line}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LyricPlayer
