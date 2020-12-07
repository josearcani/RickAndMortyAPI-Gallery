const c = console.log
let pageCount = 1
let totalPages  /* this if for limiting the pages */
const infoContainer = document.querySelector('.api-info__text')
const btnsContainer = document.querySelector('.info-section__btns')
const cardsContainer = document.querySelector('.card-container')

const left = document.querySelector('.left')
const right = document.querySelector('.right')
// c(left, right)


const URL = "https://rickandmortyapi.com/api/character"
const URL_PAGE = "/?page=:id"

// const cs ={
//   characters:"https://rickandmortyapi.com/api/character",
//   locations:"https://rickandmortyapi.com/api/location",
//   episodes:"https://rickandmortyapi.com/api/episode"
// }


window.addEventListener('DOMContentLoaded', function() {
  getAPIdata(URL, function(error, data) {
    if (error) {
      console.error(`un error chingon ${error}`) 
    } else {
      // c(data['info'].pages)
      totalPages = data['info'].pages /* to limi the cicle when reaching the last and first page */
      printInfoData(data.info)
      printCharacters(data.results)
    }
  })
})

/* to print info data */
function printInfoData(infoData) {
  // c(infoData)
  const info = `<p>total <span>${infoData.count}</span></p>
  <p>pages <span>${infoData.pages}</span></p>
  <p>you are on page <span>${pageCount}</span></p>`
  infoContainer.innerHTML = info
}

/* to print the cards */
function printCharacters(charData) {
  c(charData)
  const data = charData.map(function(character) {
    return `<article class="card-item">
    <figure class="img-container">
      <img src=${character.image} alt=${character.name} class="card-item__img">
    </figure>
    <div class="card-item__info">
      <h4>${character.name}</h4>
      <p>species: <span>${character.species}</span></p>
      <p>gender: <span>${character.gender}</span></p>
    </div>
    <p class="status ${character.status.toLowerCase()}">${character.status}</p>
  </article>`
  }).join('')
  // c(data)
  cardsContainer.innerHTML = data
}



/* to obtain data from API */
function getAPIdata(apiUrl, callback) {
  const request = new XMLHttpRequest()
  request.open('GET', apiUrl)
  request.responseType = 'json'
  request.onreadystatechange = () => {
    if (request.readyState === request.DONE) {
      if (request.status === 200) {
        // c(request.response['results'][0])
        callback(null, request.response)
      } else {
        const error = new Error(`Error paso aquí ${apiUrl}`)
        return callback(null, error)
      }
    }
  }
  request.send()
}

right.addEventListener('click', function() {
  pageCount++
  if(pageCount === totalPages + 1) {
    pageCount = 1 
  }
  const myURL = `${URL}${URL_PAGE.replace(':id', pageCount)}`
  // c(myURL)
  getAPIdata(myURL, function(error, data) {
    if (error) {
      console.error(`un error chingon ${error}`) 
    } else {
      // c(data['info'])
      printInfoData(data.info)
    }
  })
})

left.addEventListener('click', function() {
  pageCount--
  if (pageCount === 0) {
    pageCount = totalPages
  }
  c(pageCount)
  const myURL = `${URL}${URL_PAGE.replace(':id', pageCount)}`
  // c(myURL)
  getAPIdata(myURL, function(error, data) {
    if (error) {
      console.error(`un error chingon ${error}`) 
    } else {
      // c(data['info'])
      printInfoData(data.info)
    }
  })
})