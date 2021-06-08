var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')

var app = express()
var port = process.env.PORT || 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
var puzzleData = require('./puzzleData.json')



app.use(express.static('public'))

app.get('/', function(req, res) { 
    var rand = Math.floor(Math.random() * puzzleData.puzzles.length)
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

app.get('*', function(req, res) {
    res.status(404).render('404Page')
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})