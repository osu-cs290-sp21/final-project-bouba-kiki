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


e2.onclick = e => {

    console.log(e.offsetX)
    console.log(e.offsetY)

    if(e.offsetX >= x - 80 && e.offsetX <= x + 55){
        if(e.offsetY >= y - 65 && e.offsetY <= y + 65) {
            console.log("success!")
        } 
    }
}

window.onload  = function(){
    makeimg(c)
}

function selectimg(){
    location.reload()
}


function makeimg(imgpth){

    randx = Math.floor(Math.random() * width ) + 1; 
    randy = Math.floor(Math.random() * height) + 1; 

    console.log(imgpth)
    console.log("x ==", x)
    console.log("y ==", y)

    mergeImages([
        {src: imgpth, width: 900, height: 700}, 
        {src: './resources/robHess.png', x: randx, y: randy},
    ])

    .then(b64 => document.querySelector('.puzzle-photo').src = b64);


}