const c = console.log
let pageCount = 1
let totalPages

const infoContainer = document.querySelector('.api-info__text')
const cardsContainer = document.querySelector('.card-container')

const preloader = document.querySelector('.preloader')

const left = document.querySelector('.left')
const right = document.querySelector('.right')
// c(left, right)


const URL = "https://rickandmortyapi.com/api/location"
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
        if (request.status === 200) {
          resolve(request.response)
          // c(request.response['results'][0])
        } else {
          const error = new Error(`Error paso aquí ${apiUrl}`)
          reject(error)
        }
      }
    }
    request.send()
  })
}

getAPIdata(URL)
.then(data => {
  totalPages = data['info'].pages
  printInfoData(data.info)
  printLocations(data.results)
})
.catch(err => c(err))


const printInfoData = (data) => {
  const info = `<p>total <span>${data.count}</span></p>
  <p>pages <span>${data.pages}</span></p>
  <p>you are on page <span>${pageCount}</span></p>`
  infoContainer.innerHTML = info
}

const printLocations = (locData) => {
  const data = locData.map(function(location) {
    return `<article class="card-item location">
    <div class="card-location">
      <p>n° <span>${location.id}</span></p>
      <p>name: <span>${location.name}</span></p>
      <p>type: <span>${location.type}</span></p>
      <p>dimension: <span>${location.dimension}</span></p>
    </div>
  </article>`
  }).join('')
  // c(data)
  cardsContainer.innerHTML = data
}

right.addEventListener('click', function() {
  pageCount++
  if(pageCount === totalPages + 1) {
    pageCount = 1 
  }
  const myURL = `${URL}${URL_PAGE.replace(':id', pageCount)}`
  // c(myURL)
  getAPIdata(myURL)
  .then(data => {
    printInfoData(data.info)
    printLocations(data.results)
  })
  .catch(error => {
    console.error(`un error chingon ${error}`) 
  })
})

left.addEventListener('click', function() {
  pageCount--
  if (pageCount === 0) {
    pageCount = totalPages
  }
  // c(pageCount)
  const myURL = `${URL}${URL_PAGE.replace(':id', pageCount)}`
  // c(myURL)
  getAPIdata(myURL)
  .then(data => {
    printInfoData(data.info)
    printLocations(data.results)
  })
  .catch(error => {
    console.error(`un error chingon ${error}`) 
  })
})