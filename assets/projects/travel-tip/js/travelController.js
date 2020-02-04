let gMap, gMapInfo;
let gCurrmarker;
let gQueryCoord;
document.body.onload = init

function init() {
    let queryCoord = getQueryString()
    initMap(queryCoord)
    queryCoord || getMyLocation()
    queryCoord && getAddressByCoord(queryCoord).then(updateShowLocation)
    handleEvents()
}

function renderLocations() {
    let locations = getLocationsToRender()
    const elTable = document.querySelector('.table-container')
    elTable.innerHTML = ''
    locations.forEach(location => {
        const locationPreview = new LocationPreview(location.address)
        elTable.appendChild(locationPreview.render())
    })
}
function getQueryString() {
    let queryCoord = {};
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('lng')) {
        queryCoord.lng = +urlParams.get('lng')
        queryCoord.lat = +urlParams.get('lat')
        return queryCoord
    } else return false
}
function openAddLocationModal(address) {
    let prmUserDecision = Swal.fire({
        title: address,
        text: "Would you like to save this location?",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!'
    })
    prmUserDecision.then((result) => {
        if (result.value) {
            addLocation(address)
            renderLocations()
            removeCurrMarker()
            updateShowLocation(address)
            Swal.fire(
                'Saved',
                'The location has been saved',
                'success'
            )
        }
    })
}
function handleEvents() {
    document.querySelector('.locate').addEventListener('click', getMyLocation, true)
    document.querySelector('.search-box+button').addEventListener('click', searchLocation)
    document.querySelector('.location-copy').addEventListener('click', onCopyLocation)
}

function updateShowLocation(address) {
    const elLocation = document.querySelector('.curr-location')
    elLocation.innerHTML = address
}

function searchLocation() {
    let search = document.querySelector('.search-box').value
    getCoordByAddress(search).then(placeMarker)
}

function onCopyLocation() {
    let coords = getCurrCord()
    let copyStr = `https://knevo.github.io/travel-tip/?lng=${coords.lng}&lat=${coords.lat}`
    copyToClipboard(copyStr)
}

function initMap(queryCoord) {

    gMap = new google.maps.Map(document.getElementById('map'), {
        center: (queryCoord) ? queryCoord : { lng: 43.12, lat: -12.32 },
        zoom: (queryCoord) ? 15 : 0,
        streetViewControl: false,
    });
    gMapInfo = new google.maps.InfoWindow;
    gMap.addListener('click', function (event) {
        placeMarker(event.latLng);
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(gMap);
}

function getMyLocation(save = false) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            gMapInfo.setPosition(pos);
            gMapInfo.setContent('You are here');
            gMapInfo.open(gMap);
            gMap.setCenter(pos);
            gMap.setZoom(12)

            if (save) placeMarker(pos)
            else getAddressByCoord(pos).then(updateShowLocation)
        }, function () {
            handleLocationError(true, gMapInfo, gMap.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, gMapInfo, gMap.getCenter());
    }
}
function placeMarker(location, save = false) {
    gMap.setCenter(location)
    gCurrmarker = new google.maps.Marker({
        position: location,
        map: gMap
    });

    getAddressByCoord(gCurrmarker.position.toJSON())
        .then(address => {
            openAddLocationModal(address)
        })
}
function removeCurrMarker() {
    gCurrmarker.setMap(null)
}
function copyToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}