var x,y;

function placeRobdoWithData() {
    x = parseInt(document.getElementById('x').textContent)
    y = parseInt(document.getElementById('y').textContent)
    console.log(x)
    console.log(y)
    var path = document.querySelector('.puzzle-photo').src.split('http://localhost:3000')[1]
    console.log(path)
    makeimg(path,x,y)
    
}

function makeimg(imgpth, x, y){
    mergeImages([
        {src: imgpth}, 
        {src: '../../resources/robHess.png', x: x, y: y},
    ])
    
    .then(b64 => document.querySelector('.puzzle-photo').src = b64);
}
placeRobdoWithData()


//TODO: IN DIRE NEED OF CLEAN UP
var z = 1
var puzzelecont = document.querySelector('.puzzle')
var maincont = document.querySelector('.main-container')
var width = document.querySelector('.puzzle-photo').width
var height = document.querySelector('.puzzle-photo').height
var e2 = document.querySelector('.puzzle-photo')

e2.onclick = e => {

    console.log(e.offsetX)
    console.log(e.offsetY)

    var xcheck = x/(2500/width)
    var ycheck = y/(1448/height)

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


