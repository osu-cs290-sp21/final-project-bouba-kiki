var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
var fs = require('fs')

var app = express()
var port = process.env.PORT || 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
var puzzleData = require('./puzzleData.json')
var rand


app.use(express.json())
app.use(express.static('public'))

app.get('/', function(req, res) { 
    rand = Math.floor(Math.random() * puzzleData.puzzles.length)
    res.status(200).render('homePage', {
        name: puzzleData.puzzles[rand].name,
        path: puzzleData.puzzles[rand].path,
        likes: puzzleData.puzzles[rand].likes
    })
})

app.get('/gallery', function(req, res) {
    res.status(200).render('galleryPage', {
        name: puzzleData.puzzles[0].name,
        path: puzzleData.puzzles[0].path,
        likes: puzzleData.puzzles[0].likes
    })
})

app.get('/about', function(req, res) {
    res.status(200).render('aboutPage')
})

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