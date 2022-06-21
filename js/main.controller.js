'use strict'

function init() {
  getYTRes('עמוס').then(renderSearchedRes)
}

function onSearch(e) {
  e.preventDefault()
  let elInput = document.querySelector('.search-input')
  console.log(elInput.value)
  getYTRes(elInput.value).then(renderSearchedRes)
  elInput.value = ''
}

function renderSearchedRes(searchData) {
  console.log(searchData)
  const { items } = searchData
  const { title } = items[0].snippet

  const strHTML = items
    .map(video => {
      const { thumbnails, title } = video.snippet

      return `
     <div class="video" onclick="onLoadVideo('${video.id.videoId}', '${title}')">
            <h2>${title}</h2>
            <img src="${thumbnails.default.url}" alt="">
        </div>
    `
    })
    .join('')

  const elVideoList = document.querySelector('.video-list')
  elVideoList.classList.remove('hidden')
  elVideoList.innerHTML = strHTML

  const elPlayer = document.getElementById('video')

  document.querySelector('.query-wiki-title').innerText = searchData.query
  document.querySelector('.video-title').innerText = title
  elPlayer.src = `https://www.youtube.com/embed/${items[0].id.videoId}`
  document.querySelector('.wiki-text').innerHTML = searchData.wikiText
}

function onLoadVideo(videoId, title) {
  const elPlayer = document.getElementById('video')
  elPlayer.src = `https://www.youtube.com/embed/${videoId}`
  document.querySelector('.video-title').innerText = `${title}`
}
