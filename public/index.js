var x,y,z;
var randx,randy;

var width = document.querySelector('.puzzle-photo').width
var height = document.querySelector('.puzzle-photo').height

x = Math.floor(Math.random() * width ) + 1; 
y = Math.floor(Math.random() * height) + 1; 
z = 1;


var e2 = document.querySelector('.puzzle-photo')
var c = e2.src.split('http://localhost:3000')[1]

var next = document.querySelector('.next-button')
var likeButton = document.querySelector('.like-icon')
var puzzelecont = document.querySelector('.puzzle')
var maincont = document.querySelector('.main-container')
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
    
    randx = Math.floor(Math.random() * 2300 ) + 1; 
    randy = Math.floor(Math.random() * 1228) + 1; 
    
    console.log(imgpth)
    console.log("x ==", randx)
    console.log("y ==", randy)
    
    mergeImages([
        {src: imgpth}, 
        {src: './resources/robHess.png', x: randx, y: randy},
    ])
    
    .then(b64 => document.querySelector('.puzzle-photo').src = b64);
    
    
}

e2.onclick = e => {

    console.log(e.offsetX)
    console.log(e.offsetY)

    var xcheck = randx/(2500/width)
    var ycheck = randy/(1448/height)

    console.log(xcheck)

    if(e.offsetX >= xcheck - 40 && e.offsetX <= xcheck + 40){
        if(e.offsetY >= ycheck - 40 && e.offsetY <= ycheck + 40) {

            console.log("success!")

            if(z){
                z = 0;
                var success = document.createElement("p")
                success.classList.add("success-button")
                success.textContent = 'Success!'

               
                 for (var i = 0;  i < 10; i++) {
                    var particle = document.createElement("div")
                    particle.classList.add("confetti")
                    maincont.appendChild(particle)
                 }

                 puzzelecont.appendChild(success)
            }
        } 
    }
}



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

