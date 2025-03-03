const getCurrentLine = (lyricTime: number[], currentTime: number): number => {
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

const loadLyricJson = async (
  lyricName: string
): Promise<Record<string, string[]> | null> => {
  try {
    const response = await fetch(`./lyric/${lyricName}.json`)
    const lyricJson: Record<string, string[]> = await response.json()
    return lyricJson
  } catch (error) {
    return null
  }
}

export { getCurrentLine, loadLyricJson }
