import { useEffect, useState } from 'react'
import { getCurrentLine } from '@/lib/lyricUtils'

interface LyricPlayerProps {
  audio: HTMLAudioElement
  lyricJson: Record<string, string[]>
}

const LyricPlayer: React.FC<LyricPlayerProps> = ({ audio, lyricJson }) => {
  const [currentLineIdx, setCurrentLine] = useState(-1)
  const values = Object.values(lyricJson)
  const meanLength = Math.round(
    values.reduce((a, b) => a + b.length, 0) / values.length
  )
  const pHeight = (20 + 16) * meanLength
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
    <ul
      className='relative mx-auto p-0 w-[600px] duration-600'
      style={{ transform: `translateY(${finalTranslateY}px)` }}
    >
      {Object.keys(lyricJson).map((key, index) => (
        <li
          key={index}
          className={`list-none p-0 m-0 ${
            index === currentLineIdx ? 'text-[#fd4a47] font-bold' : ''
          }`}
        >
          {lyricJson[key].map((line: string, i: number) => (
            <p key={i} className='truncate h-5 text-center mt-0 mb-4'>
              {line}
            </p>
          ))}
        </li>
      ))}
    </ul>
  )
}

export default LyricPlayer
