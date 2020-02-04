'use strict'
var gBooks = [];
var gCurrBook = null;
var gSortBy = 'name'
var gSortDirection = 1;
var gCurrPage = 0;


function createBook(id, name, price, imgUrl) {
    return {
        id,
        name,
        price,
        imgUrl,
        rate: 0
    }
}
function createBooks() {
    gBooks.push(createBook(getRandomID(), 'Game of thrones', 100, 'imgs/got.jpg'))
    gBooks.push(createBook(getRandomID(), 'Harry Potter', 88, 'imgs/harry.jpg'))
    gBooks.push(createBook(getRandomID(), 'The Cat in the Hat', 49, 'imgs/catHat.jpg'))
    gBooks.push(createBook(getRandomID(), 'The Little Prince', 49, 'imgs/prince.jpg'))
    return gBooks

}
function getBooksToRender() {
    var sortedBooks = gBooks.sort(function (book1, book2) {
        return (book1[gSortBy] > book2[gSortBy] ? 1 :
            (book1[gSortBy] < book2[gSortBy] ? -1 : 0)) * gSortDirection
    })
    return sortedBooks.slice(gCurrPage * booksPerPage, gCurrPage * booksPerPage + booksPerPage)
}
function deleteBook(bookID) {
    var bookIdx = getBookIndexById(bookID)
    gBooks.splice(bookIdx, 1)
    saveBooks()
}
function addBook(name, price, imgUrl) {
    gBooks.push(createBook(getRandomID(), name, price, imgUrl))
    saveBooks()
}
function getBookIndexById(bookID) {
    return gBooks.findIndex(function (book) {
        return book.id === bookID
    })
}
function getBookById(bookID) {
    return gBooks.find(function (book) {
        return book.id === bookID
    })
}
function setCurrBook(bookID) {
    gCurrBook = getBookById(bookID)
    return gCurrBook
}
function getCurrBook(){
    return gCurrBook
}
function updateBookPrice(newPrice) {
    gCurrBook.price = newPrice
    saveBooks()
}
function updateBookRate(newRate) {
    gCurrBook.rate = newRate
    saveBooks()
}
function saveBooks() {
    saveToStorage('books', gBooks)
}
function loadBooks() {
    gBooks = loadFromStorage('books', [])
    if (gBooks.length === 0) createBooks()
}
function setSortStatus(sortBy) {
    gSortDirection = (gSortBy === sortBy) ? -gSortDirection : gSortDirection
    gSortBy = sortBy
}
function setCurrentPage(newPage) {
    gCurrPage = newPage;
}
function getBooksAmount() {
    return gBooks.length
}
function getCurrPage(){
    return gCurrPage
}