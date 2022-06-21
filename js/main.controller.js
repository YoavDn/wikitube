'use strict'

function onSearch(e) {
  e.preventDefault()
  let elInput = document.querySelector('.search-input')
  console.log(elInput.value)
  getYTRes(elInput.value).then(renderSearchedRes)
  elInput.value = ''
}

function renderSearchedRes(searchData) {
  const { items } = searchData
  console.log(items)

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
}
