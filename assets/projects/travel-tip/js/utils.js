function getRandomId() {
    var chars = '1234567890AXDCTVGBXIUNMOPTYFVRDQ'
    var id = ''
    for (let i = 0; i < 3; i++) {
        id += chars[getRandomNumber(chars.length)]
    }
    return id;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}