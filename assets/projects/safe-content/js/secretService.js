var gUsers, gSortStatus = 'name' , gUser , gIsDec = gIsDec;
function createUser(name, password, lastLogin, isAdmin) {
    var user = {
        name,
        password,
        lastLogin,
        isAdmin
    }
    return user
}
function getUsers() {
    gUsers.sort(dynamicSort(gSortStatus))
    return gUsers
}
function setSortStatus(sortBy) {
    if (gSortStatus === sortBy) gIsDec = !gIsDec;
    else gIsDec = false;
    gSortStatus = sortBy;

}
function addUser(user){
    gUsers.push(user)
}
function createUsers() {
    var users = []
    users.push(createUser('nevo', 'nevo18', Date.now(), true))
    users.push(createUser('puki', 'puki1', Date.now(), false))
    users.push(createUser('muki', 'muki1', Date.now(), false))
    return users;
}
function saveUsers() {
    saveToStorage('users', gUsers)
}
function loadUsers() {
    gUsers = loadFromStorage('users',createUsers())
}

function loadUser(){
    gUser = loadFromStorage('loggedInUser', null);
}
function doLogin(username, password) {
    var user  = gUsers.find(function(user){
        return (username === user.name && password === user.password);
    });

    if (user){
        gUser = user;
        gUser.lastLogin = Date.now();
        saveUser(gUser);
        saveUsers();
        return gUser
    }
    return null
}
function saveUser(user){
    saveToStorage('loggedInUser', user)
}

function saveUsers(){
    saveToStorage('users' , gUsers)
}

function doLogout() {
    localStorage.removeItem('loggedInUser')
} 
function isAdmin(){
   return (gUser && gUser.isAdmin);
}

function dynamicSort(property) {
   
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * (gIsDec? -1 : 1);
    }
}