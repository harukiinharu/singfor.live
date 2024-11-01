import { LyricUl, parseLyrics } from './utils.js'

async function main() {
  var lyricName = new URLSearchParams(window.location.search).get('name')
  if (lyricName === null) lyricName = '少年少女'

  const mainaudio = document.getElementById('mainaudio')
  mainaudio.src = './audio/' + lyricName + '.mp3'

  const res_nihongo = await fetch('./lyric/' + lyricName + '-nihongo.txt')
  const text_nihongo = await res_nihongo.text()
  const res_romaji = await fetch('./lyric/' + lyricName + '-romaji.txt')
  const text_romaji = await res_romaji.text()
  const res_pinyin = await fetch('./lyric/' + lyricName + '-pinyin.txt')
  const text_pinyin = await res_pinyin.text()
  const res_zh_CN = await fetch('./lyric/' + lyricName + '-zh_CN.txt')
  const text_zh_CN = await res_zh_CN.text()
  const parseRes = parseLyrics(
    text_romaji,
    text_nihongo,
    text_pinyin,
    text_zh_CN
  )
  const container = document.getElementById('container')

  if (parseRes.lyricTime !== false) {
    var lyricUl = new LyricUl(
      mainaudio,
      container,
      parseRes.lyricTime,
      parseRes.lyricJson
    )
  }

  mainaudio.ontimeupdate = () => {
    lyricUl.ontimeupdate()
  }
}

main()
