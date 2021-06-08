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
        route = "li.gallery a"
    }
    else if (currRoute === '/about') {
        route = "li.about a"
    }

    makeLinkActive(route)
}
findRoute()