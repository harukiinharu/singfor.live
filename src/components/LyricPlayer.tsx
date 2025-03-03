import { useEffect, useState, useRef } from 'react'
import { getCurrentLine } from '@/lyricUtils'
import { cn } from '@/lib/utils'

interface LyricPlayerProps {
  audio: HTMLAudioElement
  lyricJson: Record<string, string[]>
}

const LyricPlayer: React.FC<LyricPlayerProps> = ({ audio, lyricJson }) => {
  const [currentLineIdx, setCurrentLine] = useState(-1)
  const containerRef = useRef<HTMLUListElement>(null)
  const lineRefs = useRef<(HTMLLIElement | null)[]>([])

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
        setCurrentLine(newLineIdx)
        // Scroll to the current line smoothly
        if (newLineIdx >= 0 && lineRefs.current[newLineIdx]) {
          lineRefs.current[newLineIdx]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
  }, [currentLineIdx])

  return (
    <ul
      ref={containerRef}
      className='mx-auto w-[600px] h-full overflow-y-auto scrollbar-hide'
    >
      {Object.keys(lyricJson).map((key, index) => (
        <li
          key={index}
          ref={(el: HTMLLIElement | null) => {
            lineRefs.current[index] = el
          }}
          className={cn(
            'list-none',
            index === currentLineIdx ? 'text-[#fd4a47] font-bold' : ''
          )}
        >
          {lyricJson[key].map((line: string, i: number) => (
            <p key={i} className='break-words min-h-5 text-center mb-4'>
              {line}
            </p>
          ))}
        </li>
      ))}
    </ul>
  )
}

export default LyricPlayer
