let elMovList = document.querySelector('.movies__list')
let partMovies = movies.slice(0, 100)
fnRender(partMovies)
function fnRender(data) {
  let arrLocDataHeart = JSON.parse(window.localStorage.getItem('locdata'))
  elMovList.innerHTML = ''
  data.forEach((item, index) => {
    let newLi = document.createElement('li')
    newLi.classList = 'movies__item'
    newLi.innerHTML = `
    <div class="movies__card" style="margin-top: 50px">
    <img src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" alt="">
    <div class="card__info">
      <h3 class="text-light">${item.Title.toString().split("").splice(0, 12).join("")}</h3>
    <div class="d-flex align-items-center justify-content-betwee fs-4">
      <p class="text-secondary me-5">${item.movie_year}</p>
      <b class="text-secondary ms-5 mt-3 ps-4 mb-3">${item.imdb_rating}</b>
    </div>
    <p class="fs-4 text-light mb-3">${item.Categories.toString().split("").splice(0, 15).join("")}</p>
    <div class="d-flex align-items-center justify-content-between text-light">
     <button onclick="fnMoreInfo('${item.ytid}')" class="btn btn-warning" data-bs-toggle="modal"
      data-bs-target="#exampleModal">More</button><i onclick="fnAddLocData('${item.ytid}')" 
      class="${(arrLocDataHeart && arrLocDataHeart.find((i)=>i.ytid == item.ytid)) ? "bi bi-heart-fill" : "bi bi-heart"}"></i>
      
    </div>
    </div>
  </div>
    `
    elMovList.appendChild(newLi);

  });

}


function fnYear(value) {
  if (value == 'New') {
    fnRender(partMovies.sort((a, b) => b.movie_year - a.movie_year));
  } else {
    fnRender(partMovies.sort((a, b) => a.movie_year - b.movie_year));
  }
}

function fnRanting(value) {
  if (value == 'Max') {
    fnRender(partMovies.sort((a, b) => b.imdb_rating - a.imdb_rating));
  } else {
    fnRender(partMovies.sort((a, b) => a.imdb_rating - b.imdb_rating));
  }
}

let arrCategory = []
partMovies.forEach((item) => {
  if (!arrCategory.includes(item.Categories)) {
    arrCategory.push(item.Categories);
  }
})
arrCategory.forEach((item) => {
  let newOption = document.createElement('option')
  newOption.textContent = item
  document.querySelector('.sel__category').appendChild(newOption).style.color = 'black'
})


function fnCategory(value) {
  let filMov = partMovies.filter((item) => item.Categories == value);
  fnRender(filMov);
  if (filMov <= 3) {
    filMov.style.justifyContent = 'space-around'
  }
  elMovList
}


function fnSearch(event) {
  event.preventDefault()
  let val = event.target.title.value;
  fnRender(partMovies.filter((item) => item.Title.toString().toLowerCase().includes(val.toLowerCase())));
}
let elModalDialog = document.querySelector('.modal-dialog')
function fnMoreInfo(id) {

  let item = (partMovies.find(i => i.ytid == id))
  elModalDialog.innerHTML
    = `
  <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-light" id="exampleModalLabel">${item.Title}</h1>
        <button onclick="pauseVideo()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="youtubePlayer">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/${item.ytid}"
         title="iPhone 15 Pro | Titanium | Apple" frameborder="0" allow="accelerometer; 
         autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
         <p class="text-light mt-3 mb-3">${item.summary}</p>
         <div class="modal-footer d-flex align-items-center justify-content-between">
          <span class="d-flex align-items-center text-light">
            <p>${Math.floor(item.runtime / 60) + ':' + item.runtime % 60}</p>
            <p class="ms-3 bg-success p-2">${item.Categories}</p>
          </span>
        <span>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button class="btn btn-primary">${item.language}</button>
        </span>
      </div>
    </div>
  </div>
  `
}


let elFavMov = document.querySelector('.favourite__move')
let locData = []
function fnAddLocData(id) {
  if (window.localStorage.getItem('locdata')) {
    locData = JSON.parse(window.localStorage.getItem('locdata'))
  }
  let item = partMovies.find(i => i.ytid == id)
  if (locData.find((i => i.ytid == item.ytid))) {

    window.localStorage.setItem('locdata', JSON.stringify(locData.filter((k)=> k.ytid !== id)))
  }else{
    locData.push(item)
    window.localStorage.setItem('locdata', JSON.stringify(locData))
  }
  fnRender(partMovies)
}


function fnRenLoc() {
  elFavMov.innerHTML = ``
  let favouritMovie = JSON.parse(window.localStorage.getItem('locdata'))
  favouritMovie.forEach((item)=>{
    let newLI = document.createElement('li')
    newLI.innerHTML = `
      <div class="border-1 d-flex align-items-center ">
          <img onclick="fnMoreInfo('${item.ytid}')" data-bs-toggle="modal"
          data-bs-target="#exampleModal" height="80" src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" alt="">
          <p class="ms-3 text-light">${item.Title}</p>
        </div>
    `
    elFavMov.appendChild(newLI)
  })
}
fnRenLoc()


function pauseVideo() {
  var youtubePlayer = document.getElementById('youtubePlayer');
  console.log(youtubePlayer);
  setTimeout(()=>{
    youtubePlayer.innerHTML = ''
  },500)
}

function deletFav() {
  window.localStorage.clear()
  fnRenLoc()
}


function countPegenation(count){
  console.log(count);
}