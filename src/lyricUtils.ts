export function getCurrentLine(lyricTime: number[], currentTime: number): number {
  let left = -1;
  let right = lyricTime.length - 1;
  let mid: number;

  while (left < right) {
    mid = left + Math.floor((right - left) / 2) + ((right - left) % 2);
    if (lyricTime[mid] <= currentTime) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  
  return left;
}

export function parseLyrics(
  text_romaji: string,
  text_nihongo: string,
  text_pinyin: string,
  text_zh_CN: string
) {
  const lines_romaji = text_romaji.trim().split('\n');
  const lines_nihongo = text_nihongo.trim().split('\n');
  const lines_pinyin = text_pinyin.trim().split('\n');
  const lines_zh_CN = text_zh_CN.trim().split('\n');

  const lyricJson: Record<string, string[]> = {};
  const lyricTime: number[] = [];

  const pattern = /^(\[.*\])(.*)/;

  for (let i = 0; i < lines_nihongo.length; i++) {
    const match_romaji = lines_romaji[i].match(pattern);
    const match_nihongo = lines_nihongo[i].match(pattern);
    const match_pinyin = lines_pinyin[i].match(pattern);
    const match_zh_CN = lines_zh_CN[i].match(pattern);

    if (!match_romaji || !match_nihongo || !match_pinyin || !match_zh_CN) {
      continue;
    }

    const time_nihongo = match_nihongo[1];
    const curTime =
      parseFloat(time_nihongo.substring(1, 3)) * 60 +
      parseFloat(time_nihongo.substring(4, 10));
    
    lyricTime.push(curTime);

    const lyric_romaji = match_romaji[2].trim();
    const lyric_nohongo = match_nihongo[2].trim();
    const lyric_pinyin = match_pinyin[2].trim();
    const lyric_zh_CN = match_zh_CN[2].trim();
    
    lyricJson[time_nihongo] = [
      lyric_romaji,
      lyric_nohongo,
      lyric_pinyin,
      lyric_zh_CN,
      '',
    ];
  }

  // Add an extra time point at the end
  if (lyricTime.length > 0) {
    lyricTime.push(lyricTime[lyricTime.length - 1] + 100);
  }

  return { lyricTime, lyricJson };
} 