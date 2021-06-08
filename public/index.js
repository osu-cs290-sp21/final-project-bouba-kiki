function makeLinkActive(route) {
    var activeLink = document.querySelector(route)
    activeLink.classList.add('active')
}


function findRoute() {
    var currentURL = window.location.href
    var currRoute = currentURL.split('http://localhost:3000')[1]
    var route

    if (currRoute === '/') {
        route = "li.home a"
    } 
    else if (currRoute === '/gallery') {
        route = "li.gallery a"
    }
    else if (currRoute === '/about') {
        route = "li.about a"
    }

    makeLinkActive(route)
}
findRoute()


var x,y;
var randx,randy;

var width = document.querySelector('.puzzle-photo').width - 50
var height = document.querySelector('.puzzle-photo').height - 50

x = Math.floor(Math.random() * width ) + 1; 
y = Math.floor(Math.random() * height) + 1; 



var e2 = document.querySelector('.puzzle-photo')
var c = e2.src.split('http://localhost:3000')[1]

var next = document.querySelector('.next-button')
next.addEventListener('click', function(){
    selectimg()
})



window.onload  = function(){
    makeimg(c)
}

function selectimg() {
    location.reload()
}


function makeimg(imgpth){
    
    randx = Math.floor(Math.random() * width ) + 1; 
    randy = Math.floor(Math.random() * height) + 1; 
    
    console.log(imgpth)
    console.log("x ==", randx)
    console.log("y ==", randy)
    
    mergeImages([
        {src: imgpth, width: 900, height: 700}, 
        {src: './resources/robHess.png', x: randx, y: randy},
    ])
    
    .then(b64 => document.querySelector('.puzzle-photo').src = b64);
    
    
}

e2.onclick = e => {

    console.log(e.offsetX)
    console.log(e.offsetY)

    if(e.offsetX >= randx - 80 && e.offsetX <= randx + 55){
        if(e.offsetY >= randy - 65 && e.offsetY <= randy + 65) {
            console.log("success!")
        } 
    }
}


var likeButton = document.querySelector('.like-icon')
function handleLikeButtonClick() {
    var likeIcon = document.querySelector('.like-icon i')
    likeIcon.classList.remove('far')
    likeIcon.classList.remove('fa-heart')
    likeIcon.classList.add('fas')
    likeIcon.classList.add('fa-heart')

    var req = new XMLHttpRequest()
    var reqUrl = '/gallery/addPuzzle'
    console.log("== reqUrl:", reqUrl)
    req.open('POST', reqUrl)

    var puzzleName = document.querySelector('.puzzle-title strong').textContent
    var puzzleLikes = parseInt(document.querySelector('.like.like-number').textContent) + 1

    var puzzle = {
        name: puzzleName,
        path: c,
        likes: puzzleLikes,
        x: randx,
        y: randy
    }
    var reqBody = JSON.stringify(puzzle)
    console.log("== reqBody:", reqBody)
    console.log("== typeof(reqBody):", typeof(reqBody))

    req.setRequestHeader('Content-Type', 'application/json')

    req.send(reqBody)

}


likeButton.addEventListener('click', handleLikeButtonClick)

