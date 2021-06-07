var x,y;

var width = document.querySelector('.puzzle-photo').width
var height = document.querySelector('.puzzle-photo').height

console.log(width)

x = Math.floor(Math.random() * width ) + 1; 
y = Math.floor(Math.random() * height) + 1; 

console.log("x ==", x)
console.log("y ==", y)

mergeImages([
    {src: './resources/doing-business-hongkong.jpg'}, 
    {src: './resources/robHess.png', x: x, y: y},
])

.then(b64 => document.querySelector('.puzzle-photo').src = b64);


var e2 = document.querySelector('.puzzle-photo')

e2.onclick = e => {

    
    console.log(e.offsetX)
    console.log(e.offsetY)

    if(e.offsetX >= x - 55 && e.offsetX <= x + 55){
        if(e.offsetY >= y - 65 && e.offsetY <= y + 65) {
            console.log("success!")
        } 
    }
}