'use strict'

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
     <div class="video" onclick="onloadVideo()">
            <h2>${title}</h2>
            <img src="${thumbnails.default.url}" alt="">
        </div>
    `
    })
    .join('')
  document.querySelector('.video-list').innerHTML = strHTML
  const elPlayer = document.getElementById('video')

  document.querySelector('.video-title').innerText = title
  elPlayer.src = `https://www.youtube.com/embed/${items[0].id.videoId}`
  document.querySelector('.wiki-text').innerHTML = searchData.wikiText
}
