import { useEffect, useRef, useState } from 'react'
import { LyricPlayer } from './LyricPlayer'
import { parseLyrics } from './lyricUtils'

function App() {
  const [lyricData, setLyricData] = useState<{
    lyricTime: number[];
    lyricJson: Record<string, string[]>;
  } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const loadLyrics = async () => {
      const params = new URLSearchParams(window.location.search);
      const lyricName = params.get('name') || '少年少女';

      try {
        const [nihongo, romaji, pinyin, zhCN] = await Promise.all([
          fetch(`./lyric/${lyricName}-nihongo.txt`).then(res => res.text()),
          fetch(`./lyric/${lyricName}-romaji.txt`).then(res => res.text()),
          fetch(`./lyric/${lyricName}-pinyin.txt`).then(res => res.text()),
          fetch(`./lyric/${lyricName}-zh_CN.txt`).then(res => res.text())
        ]);

        const parseResult = parseLyrics(romaji, nihongo, pinyin, zhCN);
        setLyricData(parseResult);

        if (audioRef.current) {
          audioRef.current.src = `./audio/${lyricName}.mp3`;
          audioRef.current.volume = 0.5;
        }
      } catch (error) {
        console.error('Error loading lyrics:', error);
      }
    };

    loadLyrics();
  }, []);

  return (
    <>
      {lyricData && (
        <LyricPlayer
        audio={audioRef.current!}
        lyricTime={lyricData.lyricTime}
        lyricJson={lyricData.lyricJson}
        />
      )}
      <audio id="mainaudio" ref={audioRef} controls />
    </>
  );
}

export default App; 