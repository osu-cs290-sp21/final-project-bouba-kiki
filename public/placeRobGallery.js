var placex,placey,keyx,keyy, liked;

liked = 0;

function placeRobdoWithData() {
    placex = parseInt(document.getElementById('x').textContent)
    placey = parseInt(document.getElementById('y').textContent)
    console.log(placex)
    console.log(placey)
    var path = document.querySelector('.puzzle-photo').src.split('http://localhost:3000')[1]
    console.log(path)
    makeimg(path,placex,placey)
    
}

function makeimg(imgpth, placex, placey){
        
    console.log(imgpth)
    console.log("x ==", placex)
    console.log("y ==", placey)

    keyx = placex
    keyy = placey
    
    mergeImages([
        {src: imgpth}, 
        {src: '../../resources/robHess.png', x: placex, y: placey},
    ])
    
    .then(b64 => document.querySelector('.puzzle-photo').src = b64);
}

placeRobdoWithData()

var displaybool  = 1
var puzzelecont = document.querySelector('.puzzle')
var maincont = document.querySelector('.main-container')
var next = document.querySelector('.next-button')
var likeButton = document.querySelector('.like-icon')
var likenumber = document.querySelector('.like.like-number')
var e2 = document.querySelector('.puzzle-photo')
var width = e2.width
var height = e2.height

likeButton.addEventListener('click', handleLikeButtonClick)

next.addEventListener('click', function(){
    homesend()
})

function homesend() {
    window.location.replace("/")
}

e2.onclick = e => {

    var xcheck = keyx/(2500/width)
    var ycheck = keyy/(1448/height)

    if(e.offsetX >= xcheck - 40 && e.offsetX <= xcheck + 40){
        if(e.offsetY >= ycheck - 40 && e.offsetY <= ycheck + 40) {

            console.log("success!")

            if(displaybool){
                displaybool = 0;
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
    
    if(liked){
        liked = 0;
        likeIcon.classList.remove('fas')
        likeIcon.classList.remove('fa-heart')
        likeIcon.classList.add('far')
        likeIcon.classList.add('fa-heart')

        puzzleLikes = parseInt(document.querySelector('.like.like-number').textContent) - 1
        likenumber.innerHTML = puzzleLikes
    }

    else{
        liked = 1
        
        likeIcon.classList.remove('far')
        likeIcon.classList.remove('fa-heart')
        likeIcon.classList.add('fas')
        likeIcon.classList.add('fa-heart')

       

        puzzleName = document.querySelector('.puzzle-title strong').textContent
        puzzleLikes = parseInt(document.querySelector('.like.like-number').textContent) + 1


        likenumber.innerHTML = puzzleLikes

    }
}