// 歌词类
export class LyricUl {
  constructor(mainaudio, container, lyricTime, lyricJson) {
    this.ul = document.createElement('ul')
    this.ul.className = 'lyriclist'
    container.appendChild(this.ul)
    addLi(this.ul, lyricJson)

    this.lyricTime = lyricTime
    this.lyricTime[this.lyricTime.length] =
      this.lyricTime[this.lyricTime.length - 1] + 100

    this.$li1 = $(this.ul).find('li')
    this.oldLine = -1
    this.currentLine = -1
    this.currentTime

    // 开启歌词滚动
    this.pHeight = (20 + 16) * 5
    this.tyMax = 2 * this.pHeight

    this.mainaudio = mainaudio
    this.mainaudio.volume = 0.5
  }

  ontimeupdate() {
    this.currentTime = this.mainaudio.currentTime
    this.currentLine = getCurrentLine(this.lyricTime, this.currentTime)

    if (this.oldLine != this.currentLine) {
      // 开启歌词滚动
      this.ty = -this.currentLine * this.pHeight
      if (-this.ty > this.tyMax)
        this.ul.style.transform =
          'translateY(' + (this.ty + this.tyMax).toString() + 'px)'
      else this.ul.style.transform = 'translateY(0px)'

      if (this.oldLine != -1) this.$li1.get(this.oldLine).className = ''
      if (this.currentLine != -1)
        this.$li1.get(this.currentLine).className = 'on'
      this.oldLine = this.currentLine
    }
  }
}

// 在 ul 中添加包含有歌词的 li
function addLi(ul, lyricJson) {
  for (let i in lyricJson) {
    let s = ''
    for (let j in lyricJson[i]) {
      s += '<p>' + lyricJson[i][j] + '</p>'
    }
    ul.innerHTML += '<li>' + s + '</li>'
  }
}

// 二分法查找当前歌词位置
function getCurrentLine(lyricTime, currentTime) {
  let left = -1
  let right = lyricTime.length - 1
  let mid
  while (left < right) {
    mid = left + parseInt((right - left) / 2) + parseInt((right - left) % 2)
    if (lyricTime[mid] <= currentTime) left = mid
    else right = mid - 1
  }
  return left
}

// 解析歌词文件
export function parseLyrics(
  text_romaji,
  text_nihongo,
  text_pinyin,
  text_zh_CN
) {
  const lines_romaji = text_romaji.trim().split('\n')
  const lines_nihongo = text_nihongo.trim().split('\n')
  const lines_pinyin = text_pinyin.trim().split('\n')
  const lines_zh_CN = text_zh_CN.trim().split('\n')

  const lyricJson = {}

  let lyricTime = []

  const pattern = /^(\[.*\])(.*)/
  var match_romaji
  var match_nihongo
  var match_pinyin
  var match_zh_CN
  var time_nihongo
  var curTime
  for (let i = 0; i < lines_nihongo.length; i++) {
    match_romaji = lines_romaji[i].match(pattern)
    match_nihongo = lines_nihongo[i].match(pattern)
    match_pinyin = lines_pinyin[i].match(pattern)
    match_zh_CN = lines_zh_CN[i].match(pattern)
    time_nihongo = match_nihongo[1]

    curTime =
      parseFloat(time_nihongo.substring(1, 3)) * 60 +
      parseFloat(time_nihongo.substring(4, 10))
    lyricTime.push(curTime)

    const lyric_romaji = match_romaji[2].trim()
    const lyric_nohongo = match_nihongo[2].trim()
    const lyric_pinyin = match_pinyin[2].trim()
    const lyric_zh_CN = match_zh_CN[2].trim()
    lyricJson[time_nihongo] = [
      lyric_romaji,
      lyric_nohongo,
      lyric_pinyin,
      lyric_zh_CN,
      '',
    ]
  }

  return { lyricTime: lyricTime, lyricJson: lyricJson }
}
