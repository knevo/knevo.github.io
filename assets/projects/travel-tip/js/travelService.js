'use strict'
let gLocations=[]
let gCurrCoord;
function getAddressByCoord(coord) {
    gCurrCoord = coord
    let prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coord.lat},${coord.lng}&key=AIzaSyC2AzIGXea1F29rnU7mwmxbLkZXGjuwSCA`)
    return prmAns.then((response) => {
        let { data } = response;
        return data.results[0].formatted_address
        
    })
        .catch(err => {
            console.error(err);
            return `Could not find the location`
        })
}
function getCoordByAddress(address){
    let prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC2AzIGXea1F29rnU7mwmxbLkZXGjuwSCA`)
    return prmAns.then((response) => {
        let { data } = response;
        return data.results[0].geometry.location
        
    })
        .catch(err => {
            console.error(err);
            return [`Could not find related searches`]
        })
    
}
function createLocation(address,coord){
    return {
        address,
        lat:coord.lat,
        lng:coord.lng
    };
}
function addLocation(address){
    gLocations.push(createLocation(address,gCurrCoord))
}

function getLocationsToRender(){
    return gLocations
}

function deleteLocation(address){
    let locationIdx = getIndexByAddress(address)
    gLocations.splice(locationIdx,1)

}

function updateLocation(address,newAddress){
    gLocations[getIndexByAddress(address)].address = newAddress

}

function getIndexByAddress(address){
    return gLocations.findIndex((location)=>location.address === address)
}
function getCurrCord(){
    return gCurrCoord
}
