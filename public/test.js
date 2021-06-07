var x,y;

x = Math.floor(Math.random() * 900 ) + 1; 
y = Math.floor(Math.random() * 700) + 1; 

console.log("x==", x)
console.log("y==", y)

mergeImages([
    {src: './resources/doing-business-hongkong.jpg'}, 
    {src: './resources/robHess.png', x: x, y: y},
])

.then(b64 => document.getElementsByClassName('puzzle-photo')[0].src = b64);


var e2 = document.getElementsByClassName('puzzle-photo')[0]

e2.onclick = e => {

    
    console.log(e.offsetX)
    console.log(e.offsetY)

    if(e.offsetX >= x - 55 && e.offsetX <= x + 55){
        if(e.offsetY >= y - 65 && e.offsetY <= y + 65) {
            console.log("success!")
        } 
    }
}