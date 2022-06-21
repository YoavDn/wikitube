'use strict'

const YT_KEY = 'AIzaSyBED4OxzGH11oeUpZlRckVHq0QB7f - 5 - h8'

const YT_SEARCH = 'searchResultsDB'
const WIKI_KEY = 'wikiResultsDB'

var gYTCaches = loadFromStorage(YT_SEARCH) || []
var gWIKICache = loadFromStorage(WIKI_KEY) || []

//

function getYTApi(query, key = YT_KEY) {
  return `https://www.googleapis.com/youtube/v3/search?part=snippet &videoEmbeddable=true&type=video&key=${YT_KEY}&q=${query}`
}

function getWikiApi(data, query) {
  return axios
    .get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${query}&&format=json`)
    .then(res => res.data)
    .then(res => res.query.search[0].snippet)
    .then(res => Object.assign({}, data, { wikiText: res }))
}

function getYTRes(query) {
  if (gYTCaches.find(searches => searches.query === query)) {
    console.log('from cache')
    const res = gYTCaches.find(searches => searches.query === query)
    return Promise.resolve(res)
  } else {
    return axios
      .get(getYTApi(query))
      .then(res => {
        _saveSearch(query, res.data)

        return res.data
      })
      .then(res => getWikiApi(res, query))
      .then(res => res)
  }
}
function _saveSearch(query, data) {
  gYTCaches.push({ query: query, items: data.items })
  saveToStorage(YT_SEARCH, gYTCaches)
}
