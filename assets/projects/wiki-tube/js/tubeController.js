let gColor
function init() {
    loadSearchs()
    renderHistory()
    showExample()
}
function showExample(search='bohemian raphsody') {
    document.querySelector('.search-box').value = search
    getVideos(search).then(renderSearch)
    getWiki(search).then(renderWiki)
}
function onSearch() {
    let search = document.querySelector('.search-box').value
    getVideos(search).then(renderSearch)
    saveSearch(search)
    renderHistory()
}
function renderSearch(searchRes) {
    const htmls = searchRes.map(result => {
        return `
        <div class="video-thumb flex" data-id="${result.videoId}" onclick="onVideoSelect(this.dataset.id)">
        <img src="${result.img}"/>
        <p>${result.title}</p>
        </div>`
    })
    document.querySelector('.side-list').innerHTML = htmls.join('')
}
function renderWiki(searchRes) {
    searchRes = (searchRes.length > 3) ? searchRes.slice(0, 3) : searchRes
    const htmls = searchRes.map(result => {
        return `<p>${result}</p>`
    })
    document.querySelector('.wiki').innerHTML = htmls.join('')
}
function onVideoSelect(videoId) {
    let elIFrame = document.querySelector('iframe')
    elIFrame.src = `https://www.youtube.com/embed/${videoId}`
    getWiki(document.querySelector('.search-box').value).then(renderWiki)

}
function renderHistory() {
    let searchs = getHistory()
    const htmls = searchs.map(search => {
        return `<p onclick=showExample(this.innerText)>${search}</p>`
    })
    document.querySelector('.history-container').innerHTML = htmls.join('')
}
function onHistoryClear() {
    let prmUserDecision = Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    prmUserDecision.then((result) => {
        if (result.value) {
            clearHistory()
            renderHistory()
            Swal.fire(
                'Deleted!',
                'Your history has been deleted.',
                'success'
            )
        }
    })
}
function onThemeChange() {
    let prmUserDecision = Swal.fire({
        title: 'Select desired color',
        html: '<input type="color" onchange="onColorSet(this)"/>',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Change Color'
    })
    prmUserDecision.then((result) => {
        if (result.value) {
            changeColor()
            Swal.fire(
                'Theme updated',
                'The background color has been changed',
                'success'
            )
        }
    })
}
function onColorSet(elColor){
    gColor=elColor.value
}
function changeColor(){
    document.body.style.backgroundColor = gColor
}