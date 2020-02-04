let gSearchs
function getVideos(search) {
    let prmAns = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyBTp0bJMpmphfAlKxyFQ4ZpB35GaCpF6Us&q=${search}`)
    return prmAns.then((response) => {
        let { data } = response;
        const searchRes = data.items.map(res => {
            return { title: res.snippet.title, img: res.snippet.thumbnails.default.url, videoId: res.id.videoId }
        })
        return searchRes
    })
        .catch(err => {
            console.error(err);
            return { title: 'some erroe', img: `someurl.com/img.jpg`, videoId: `dQw4w9WgXcQ` }
        })
}
function getWiki(search) {
    let prmAns = axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${search}&limit=5`)
    return prmAns.then((response) => {
        let { data } = response;
        return data[2]
    })
        .catch(err => {
            console.error(err);
            return [`Could not find related searches`]
        })
}
function saveSearch(search) {
    gSearchs.push(search)
    saveToStorage('searchs', gSearchs)
}
function loadSearchs() {
    gSearchs = loadFromStorage('searchs', ['Lime in the coco', 'Another fake search'])
}
function getHistory() {
    return gSearchs
}
function clearHistory() {
    gSearchs = []
    saveToStorage('searchs', gSearchs)
}
