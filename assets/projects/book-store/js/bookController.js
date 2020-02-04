const booksPerPage = 3;
const DEFAULT_IMG = 'imgs/default.jpg'
function init() {
    loadBooks()
    renderBooks()
    addTouchEvent()
    doTrans()
}
function renderNav() {
    var pageNum = Math.ceil(getBooksAmount() / booksPerPage)
    var lis = ''
    var className;
    for (let i = 0; i < pageNum; i++) {
        if (i===getCurrPage()) className='active'
        lis += `<li class="page-item ${className}">
        <a class="page-link" onclick="onPageChange(this)" data-val="${i}">${i + 1}</a>
      </li>`
      className=''
    }
    $('.pagination').html(lis)
}
function renderBooks() {
    renderNav()
    var $booksContainer = $('.books-container')
    var books = getBooksToRender()
    var htmls = books.map(function (book) {
        return `<tr data-id="${book.id}">
        <td class="bookID">${book.id}</td>
        <td>${book.name}</td>
        <td class="text-center">${(getLang() === 'he') ? formatCurrency(book.price) : book.price + '$'}</td>
        <td class="text-center">${book.rate}</td>
        <td><button type="button" class="btn btn-primary col-12 col-md-3" data-trans="read" onclick="onShowReadModal('${book.id}')">Read</button>
        <button type="button" class="btn btn-warning col-12 col-md-4" data-trans="update" onclick="onShowUpdateModal('${book.id}')">Update</button>
        <button type="button" class="btn btn-danger col-12 col-md-4" data-trans="delete" onclick="onShowDeleteModal('${book.id}')">Delete</button></td></tr>`
    })
    $booksContainer.html(htmls)
    doTrans()
}
function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}
function onShowAddModal() {
    $('#addBookModal').modal()
}
function onShowUpdateModal(bookID) {
    setCurrBook(bookID)
    var book = getCurrBook()
    $('#updateBookModal #oldBookPrice').text(`${(getLang()==='he')? formatCurrency(book.price):book.price+'$'}`)
    $('#newBookPrice').val(book.price)
    $('#updateBookModal').modal()
}
function onShowReadModal(bookID) {
    $elModal = $('#readBookModal')
    setCurrBook(bookID)
    var book = getCurrBook()
    $elModal.find('#readBookModalLabel').text(book.name)
    $elModal.find('.img-container').html(`<img class="img-fluid" src="${(book.imgUrl)? book.imgUrl:DEFAULT_IMG}" alt="${book.id}" title="${book.id}" class="img-fluid">`)
    $elModal.find('.details-container').html(`<h2>${book.name}</h2>
    <p><span data-trans="price">Price:</span>: ${(getLang() === 'he') ? formatCurrency(book.price) : book.price + '$'}</p>
   <label data-trans="rate">Raiting (1-10)</label>
   <input type="number" min="0" max="10" class="form-control" id="bookRaiting" onchange="onUpdateRate()">`)
    $elModal.find('#bookRaiting').val(book.rate)
    doTrans()
    $('#readBookModal').modal()
}
function onShowDeleteModal(bookId){
    $elModal = $('#confirm-modal')
    $elModal.find('[data-id="yes"]').attr('onclick',`onDeleteBook('${bookId}')`)
    $elModal.modal()
}
function onUpdateBook() {
    var newPrice = $('#newBookPrice').val()
    if (!newPrice) return
    updateBookPrice(newPrice)
    $('#newBookPrice').val('')
    renderBooks()
}
function onAddBook() {
    var name = $('#addBookModal #bookName').val()
    var price = +$('#addBookModal #bookPrice').val()
    var imgUrl = $('#addBookModal #bookImgUrl').val()
    if (!name || !price) return
    addBook(name, price, imgUrl)
    $('#addBookModal #bookName').val('')
    $('#addBookModal #bookPrice').val('')
    $('#addBookModal #bookImgUrl').val('')
    $('#addBookModal').modal('hide')
    renderNav()
    renderBooks()
}
function onUpdateRate() {
    var newRate = $('#readBookModal #bookRaiting').val()
    if (newRate > 10) return
    updateBookRate(parseInt(newRate))
    renderBooks()
}
function onSortClick(elSort) {
    setSortStatus(elSort.dataset.value)
    renderBooks()
}
function onPageChange(elPage) {
    setCurrentPage(+elPage.dataset.val)
    renderBooks()

}
function onSetLang(elLang) {
    $('#lang-drop').text(elLang.innerText)
    setLang(elLang.dataset.value)
    renderBooks()
    doTrans()
    if (elLang.dataset.value === 'he') {
        document.querySelector('body').style['direction'] = 'rtl'
    }
    else {
        document.querySelector('body').style['direction'] = 'ltr'

    }
}
function addTouchEvent(){ 
    
    var elBooks = document.querySelector('.books-container')
    const hmrBox = new Hammer(elBooks);
    hmrBox.on('panleft panright', (ev) => {
     var bookId = ev.target.parentNode.dataset.id
     if(document.body.clientWidth > 720) return
        if(ev.type === 'panright'){
            onShowDeleteModal(bookId)
        }
        if(ev.type === 'panleft') {
            onShowReadModal(bookId)
        }
        hmrBox.add(new Hammer.Pan(stop(["force"])))
    });
}
