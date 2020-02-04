'use strict'
const projUrl = 'assets/projects/'
var gProj = [];
var gCurrProj = null;
var gCurrPage = 0;
const projPerPage = 3

function createProj(id, name, title, desc, url, publishedAt, category) {
    return {
        id,
        name,
        title,
        desc,
        url,
        publishedAt,
        category
    }
}

function createProjects() {
    gProj.push(createProj('minesweeper', 'Mine Sweeper',
        'sweep those mines', 'a game', 'assets/projects/mine-sweeper/index.html', '23/11/19', 'Games'))
    gProj.push(createProj('bookshop', 'Book Shop',
        'Book shop manager', 'great interface for library managers', 'assets/projects/book-store/index.html', '1/12/19', 'Interface'))
    gProj.push(createProj('safe-content', 'Safe content',
        'Secret content inside', 'its a secret', 'assets/projects/safe-content/index.html', '25/11/19', 'Interface'))
    gProj.push(createProj('todos', 'Todos',
        'Todo List', 'Manage your todos', 'assets/projects/todos/index.html', '25/11/19', 'Interface'))
    gProj.push(createProj('color-guess', 'Color game', 'Guess the color', 'Guess which color the RGB stands for', 'assets/projects/color-guess/index.html', '8/4/19'))
    gProj.push(createProj('guess-me', 'Guess Game', 'Akinator', 'Think of any character and i will guess it', 'assets/projects/guess-me/index.html', '24/11/19', 'Tree traverse'))
    gProj.push(createProj('mister-blog', 'Blog template', 'News blog', 'A template for any news or blog site', 'assets/projects/misterblog/Site/index.html', '8/12/19', 'HTML Template'))
    gProj.push(createProj('meme-gen', 'Meme generator', 'Memes', 'A site to create and share costum memes', 'assets/projects/meme-gen/index.html', '18/12/19', 'Canvas'))
    gProj.push(createProj('travel-tip', 'Google API', 'API', 'Pin-Point locations on the map', 'assets/projects/travel-tip/index.html', '23/12/19', 'Google API,API'))
    gProj.push(createProj('wiki-tube', 'Youtube API', 'API', 'Search and play youtube videos', 'assets/projects/wiki-tube/index.html', '23/12/19', 'Youtube API,API,wikipedia'))
}

function getProjectsToRender() {
    return gProj.slice(gCurrPage * projPerPage, gCurrPage * projPerPage + projPerPage)
}

function setCurrentProject(projID) {
    gCurrProj = getProjectById(projID)
}

function getProjectById(projID) {
    return gProj.find(function (proj) {
        return proj.id === projID
    })
}

function setCurrentPage(newPage) {
    gCurrPage = newPage;
}
function getCurrentPage() {
    return gCurrPage
}

function getProjectsAmount() {
    return gProj.length
}