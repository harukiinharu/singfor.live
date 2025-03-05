import { useEffect, useState, useRef, useMemo } from 'react'
import { getCurrentLine, cn } from '@/lib/utils'

interface LyricPlayerProps {
  audio: HTMLAudioElement
  lyricJson: Record<string, string[]>
}

const LyricPlayer: React.FC<LyricPlayerProps> = ({ audio, lyricJson }) => {
  const [currentLineIdx, setCurrentLine] = useState(-1)
  const containerRef = useRef<HTMLUListElement>(null)
  const lineRefs = useRef<HTMLLIElement[]>([])

  const lyricTime = useMemo(() => {
    return Object.keys(lyricJson).map(timestamp => {
      return parseFloat(timestamp.substring(1, 3)) * 60 + parseFloat(timestamp.substring(4, 10))
    })
  }, [lyricJson])

  // time update event
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

  // keyboard event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault()
        if (audio.paused) audio.play()
        else audio.pause()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const totalLines = Object.keys(lyricJson).length
        let newIndex = currentLineIdx
        if (e.key === 'ArrowUp') {
          newIndex = Math.max(0, currentLineIdx - 1)
        } else if (e.key === 'ArrowDown') {
          newIndex = Math.min(totalLines - 1, currentLineIdx + 1)
        }

        if (newIndex !== currentLineIdx) {
          const newTimestamp = Object.keys(lyricJson)[newIndex]
          if (newTimestamp) {
            audio.currentTime =
              parseFloat(newTimestamp.substring(1, 3)) * 60 + parseFloat(newTimestamp.substring(4, 10)) + 0.001
            const hashParts = window.location.hash.split('?')
            window.history.pushState({}, '', `${hashParts[0]}?id=${newIndex}`)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentLineIdx, lyricJson, audio])

  // handle hash
  useEffect(() => {
    const hash = window.location.hash
    const hashParts = hash.split('?')
    if (hashParts.length > 1) {
      const searchParams = new URLSearchParams(hashParts[1])
      const id = searchParams.get('id')
      if (id) {
        const targetElement = document.getElementById(id)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
          audio.currentTime =
            parseFloat(Object.keys(lyricJson)[id].substring(1, 3)) * 60 +
            parseFloat(Object.keys(lyricJson)[id].substring(4, 10)) +
            0.001
        }
      }
    }
  }, [lyricJson, audio])

  return (
    <ul ref={containerRef} className='w-[600px]'>
      {Object.keys(lyricJson).map((key, index) => (
        <li
          key={index}
          id={`${index}`}
          ref={(el: HTMLLIElement) => {
            lineRefs.current[index] = el
          }}
          className={index === currentLineIdx ? 'text-[#fd4a47] font-bold' : ''}
        >
          {lyricJson[key].map((line: string, i: number) => (
            <p
              key={i}
              className={cn('min-h-[24px] text-center mb-4', line && 'cursor-pointer')}
              onClick={() => {
                if (line) {
                  audio.currentTime = parseFloat(key.substring(1, 3)) * 60 + parseFloat(key.substring(4, 10)) + 0.001
                  const hashParts = window.location.hash.split('?')
                  window.history.pushState({}, '', `${hashParts[0]}?id=${index}`)
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
