const c = console.log
let pageCount = 1
let totalPages

const infoContainer = document.querySelector('.api-info__text')
const cardsContainer = document.querySelector('.card-container')

const preloader = document.querySelector('.preloader')

const left = document.querySelector('.left')
const right = document.querySelector('.right')
// c(left, right)


const URL = "https://rickandmortyapi.com/api/episode"
const URL_PAGE = "/?page=:id"


window.addEventListener('load', function() {
  preloader.classList.add('hide-preloader')
})

/* to obtain data from API */
const getAPIdata = (apiUrl) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', apiUrl)
    request.responseType = 'json'
    request.onreadystatechange = () => {
      if (request.readyState === request.DONE) {
        request.status === 200
        ? resolve(request.response)
        : reject(new Error('Test Error'))
      }
    }
    request.send()
  })
}

const doIt = async (url) => {
  try {
    const info = await getAPIdata(url)
    // c(info)
    totalPages = info['info'].pages
    printInfoData(info.info)
    printEpisodes(info.results)
  } catch (error) {
    console.error(err);
  }
}
doIt(URL)

const printInfoData = (data) => {
  const info = `<p>total <span>${data.count}</span></p>
  <p>pages <span>${data.pages}</span></p>
  <p>you are on page <span>${pageCount}</span></p>`
  infoContainer.innerHTML = info
}

const printEpisodes = (epData) => {
  const data = epData.map(function(episode) {
    return `<article class="card-item location">
    <div class="card-location">
      <p>n° <span>${episode.id}</span></p>
      <p>name: <span>${episode.name}</span></p>
      <p>air date: <span>${episode.air_date}</span></p>
      <p>episode: <span>${episode.episode}</span></p>
    </div>
  </article>`
  }).join('')
  cardsContainer.innerHTML = data
}

right.addEventListener('click', function() {
  pageCount++
  if(pageCount === totalPages + 1) {
    pageCount = 1 
  }
  const myURL = `${URL}${URL_PAGE.replace(':id', pageCount)}`
  doIt(myURL)
})

left.addEventListener('click', function() {
  pageCount--
  if (pageCount === 0) {
    pageCount = totalPages
  }
  const myURL = `${URL}${URL_PAGE.replace(':id', pageCount)}`
  doIt(myURL)
})