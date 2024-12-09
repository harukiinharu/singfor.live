export function getCurrentLine(
  lyricTime: number[],
  currentTime: number
): number {
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

export function getLyricTime(lyricJson: Record<string, string[]>): number[] {
  const lyricTime: number[] = []

  for (const timestamp in lyricJson) {
    const curTime =
      parseFloat(timestamp.substring(1, 3)) * 60 +
      parseFloat(timestamp.substring(4, 10))

    lyricTime.push(curTime)
  }

  return lyricTime
}
