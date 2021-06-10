var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
var fs = require('fs')

var app = express()
var port = process.env.PORT || 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
var puzzleData = require('./puzzleData.json')
var rand, rand2


app.use(express.json())
app.use(express.static('public'))

app.get('/', function(req, res) { 
    rand = Math.floor(Math.random() * puzzleData.puzzles.length)
    res.status(200).render('homePage', {
        name: puzzleData.puzzles[rand].name,
        path: puzzleData.puzzles[rand].path,
        likes: puzzleData.puzzles[rand].likes,
        galleryPuzzle: false,
        gallery: false,
        home: true
    })
})

app.get('/gallery', function(req, res) {
    res.status(200).render('galleryPage', {
        puzzles: puzzleData.gallery,
        galleryPuzzle: false,
        gallery: true,
        home: false
    })
})

app.get('/about', function(req, res) {
    res.status(200).render('aboutPage', {
        galleryPuzzle: false,
        gallery: false,
        home: false
    })
})

app.get('/gallery/puzzles/:n', function(req, res, next) {
    var i = req.params.n
    var selectedPuzzle = puzzleData.gallery[i]
    if(selectedPuzzle) {
        res.status(200).render('homePage', {
            name: selectedPuzzle.name,
            path: selectedPuzzle.path,
            likes: selectedPuzzle.likes,
            x: selectedPuzzle.x,
            y: selectedPuzzle.y,
            galleryPuzzle: true,
            gallery: false,
            home: false
        })
    }
    else {
        next();
    }
})

app.get('/index/usedpuzzle', function(req,res) {

    rand2 = Math.floor(Math.random() * puzzleData.gallery.length)
    var selectedPuzzle = puzzleData.gallery[rand2]
    
    if(selectedPuzzle) {
        var JSONdata = JSON.stringify(selectedPuzzle);
        res.send(JSONdata);
    }

    else{
        next();
    }
 });

app.post('/gallery/addPuzzle', function (req, res, next) {
    console.log("== req.body:", req.body)
    if (req.body) {
        if (puzzleData.puzzles[rand]) {
            puzzleData.gallery.push({
                name: req.body.name,
                path: req.body.path,
                likes: req.body.likes,
                x: req.body.x,
                y: req.body.y
            })
            // console.log("== peopleData[" + person + "]:", peopleData[person])
            fs.writeFile(
                __dirname + '/puzzleData.json',
                JSON.stringify(puzzleData, null, 2),
                function (err) {
                    if (err) {
                        res.status(500).send("Error writing new data.  Try again later.")
                    } else {
                        res.status(200).send()
                    }
                }
            )
        } else {
            next()
        }
    } else {
        res.status(400).send("BRUH")
    }
})



app.get('*', function(req, res) {
    res.status(404).render('404Page')
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})
