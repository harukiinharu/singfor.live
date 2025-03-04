import { useEffect, useState, useRef, useMemo } from 'react'
import { getCurrentLine, cn } from '@/lib/utils'

interface LyricPlayerProps {
  audio: HTMLAudioElement
  lyricJson: Record<string, string[]>
}

const LyricPlayer: React.FC<LyricPlayerProps> = ({ audio, lyricJson }) => {
  const [currentLineIdx, setCurrentLine] = useState(-1)
  const containerRef = useRef<HTMLUListElement>(null)
  const lineRefs = useRef<(HTMLLIElement | null)[]>([])

  const lyricTime = useMemo(() => {
    return Object.keys(lyricJson).map(timestamp => {
      return (
        parseFloat(timestamp.substring(1, 3)) * 60 +
        parseFloat(timestamp.substring(4, 10))
      )
    })
  }, [lyricJson])

  useEffect(() => {
    const handleTimeUpdate = () => {
      const newLineIdx = getCurrentLine(lyricTime, audio.currentTime)
      if (newLineIdx !== currentLineIdx) {
        setCurrentLine(newLineIdx)
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
            <p
              key={i}
              className={cn(
                'break-words min-h-5 text-center mb-4',
                line && 'cursor-pointer'
              )}
              onClick={() => {
                if (line) {
                  audio.currentTime =
                    parseFloat(key.substring(1, 3)) * 60 +
                    parseFloat(key.substring(4, 10)) +
                    0.001
                }
              }}
            >
              {line}
            </p>
          ))}
        </li>
      ))}
    </ul>
  )
}

export default LyricPlayer
