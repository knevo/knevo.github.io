function getRandomId() {
    var chars = '1234567890pioutewqsfghjklmnbvcxzAXDCTVGBXIUNMOPTYFVRDQ'
    var id = ''
    for (let i = 0; i < 3; i++) {
        id += chars[getRandomNumber(chars.length)]
    }
    return id;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
function calcAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = [maxWidth / srcWidth, maxHeight / srcHeight];
    ratio = Math.min(ratio[0], ratio[1]);

    return { width: Math.round(srcWidth * ratio), height: Math.round(srcHeight * ratio) };
}