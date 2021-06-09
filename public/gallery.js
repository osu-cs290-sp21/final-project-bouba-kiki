function changeURL(i) {
    window.location.href = "/gallery/puzzles/" + i
}


var puzzleContainer = document.querySelector('.puzzle-container')
puzzleContainer.addEventListener('click', function(event) {
    var puzzle = event.target.parentElement.parentElement
    if (puzzle.children[0].classList[0] === 'img-container') {
        console.log(puzzle)
        var index = Array.from(puzzle.parentElement.children).indexOf(puzzle)
        changeURL(index)
    }
})