import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function getCurrentLine(lyricTime: number[], currentTime: number): number {
  let left = -1
  let right = lyricTime.length - 1
  let mid: number

  while (left < right) {
    mid = left + Math.floor((right - left) / 2) + ((right - left) % 2)
    if (lyricTime[mid] <= currentTime) {
      left = mid
    } else {
      right = mid - 1
    }
  }

  return left
}

async function loadLyricJson(lyricName: string): Promise<Record<string, string[]>> {
  try {
    const response = await import(`@/lyric/${lyricName}.json`)
    const lyricJson: Record<string, string[]> = response.default
    return lyricJson
  } catch (error) {
    return null
  }
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { getCurrentLine, loadLyricJson, cn }
