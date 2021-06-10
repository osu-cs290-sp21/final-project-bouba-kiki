// TODO: MAKE A JS FILE FOR EXPORTING FUNCTIONS


var width = document.querySelector('.puzzle-photo').width
var height = document.querySelector('.puzzle-photo').height
var e2 = document.querySelector('.puzzle-photo')
var next = document.querySelector('.next-button')
var likeButton = document.querySelector('.like-icon')
var puzzelecont = document.querySelector('.puzzle')
var maincont = document.querySelector('.main-container')
var likenumber = document.querySelector('.like.like-number')
var photoname = document.querySelector('strong')


likeButton.addEventListener('click', handleLikeButtonClick)
next.addEventListener('click', function(){
    pgrld()
})

var c = e2.src.split(window.location.href.toString())[1]
var randz;

console.log()

var randx,randy, displaybool, keyx, keyy, liked;
liked = 0;
displaybool = 1;

function pgrld() {
    location.reload()
}

window.onload  = function(){

    randz = Math.floor(Math.random() * 10);
    randx = Math.floor(Math.random() * 2300 ) + 1; 
    randy = Math.floor(Math.random() * 1228) + 1; 

    console.log("ranz==", randz)

    if(randz == 9)
        handleCurrentPuzzle()
    
    else
        makeimg(c, randx, randy)
}

function makeimg(imgpth, placex, placey){
        
    console.log(imgpth)
    console.log("x ==", placex)
    console.log("y ==", placey)

    keyx = placex
    keyy = placey
    
    mergeImages([
        {src: imgpth}, 
        {src: './resources/robHess.png', x: placex, y: placey},
    ])
    
    .then(b64 => document.querySelector('.puzzle-photo').src = b64);
}

e2.onclick = e => {

    console.log(e.offsetX)
    console.log(e.offsetY)

    var xcheck = keyx/(2500/width)
    var ycheck = keyy/(1448/height)

    console.log(xcheck)

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


    likenumber.innerHTML = puzzleLikes

    var puzzle = {
        name: puzzleName,
        path: c,
        likes: puzzleLikes,
        x: keyx,
        y: keyy
    }

    var reqBody = JSON.stringify(puzzle)
    console.log("== reqBody:", reqBody)
    console.log("== typeof(reqBody):", typeof(reqBody))

    req.setRequestHeader('Content-Type', 'application/json')

    req.send(reqBody)

}

function handleCurrentPuzzle(){
    var req2 = new XMLHttpRequest();
    var url = '/index/usedpuzzle';

    req2.open('GET',url,true); 
    req2.addEventListener('load',onLoad);

    req2.send();
}

function onLoad() {
   var response = this.responseText;
   var parsedResponse = JSON.parse(response);
   like = 1;
   likenumber.innerHTML = parsedResponse.likes
   photoname.innerHTML = parsedResponse.name
   makeimg(parsedResponse.path, parsedResponse.x, parsedResponse.y)

}
