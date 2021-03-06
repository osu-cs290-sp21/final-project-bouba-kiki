function removeHomeLikeStyling() {
    var likeButton = document.querySelector('.like-icon')
    likeButton.classList.remove('home')
}


function makeLinkActive(route) {
    var activeLink = document.querySelector(route)
    activeLink.classList.add('active')
}


function findRoute() {
    var currentURL = window.location.href
    var currRoute = currentURL.split('http://localhost:3000')[1]
    var route

    if (currRoute === '/') {
        route = "li.home a"
    } 
    else if (currRoute === '/gallery') {
        removeHomeLikeStyling()
        route = "li.gallery a"
    }
    else if (currRoute === '/about') {
        route = "li.about a"
    }
    else {
        route = "li.home a"
    }
    makeLinkActive(route)
}
findRoute()