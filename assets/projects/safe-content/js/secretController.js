function init() {
    loadUsers();
    loadUser()
    if (gUser) renderSecret()
    else {
        toggleLogin();
    }

}
function onLoginClick(ev) {
    ev.preventDefault()
    var username = document.querySelector('#user')
    var password = document.querySelector('#pass')

    var userLogged = doLogin(username.value, password.value)

    if (userLogged) {

        toggleLogin()
        renderSecret()
    } else {
        var elVal = document.querySelector('.wrong-pass')
        elVal.innerHTML = 'Wrong password or username'

        username.value = ''
        password.value = ''
    }
}
function onLogoutClick() {
    doLogout()
    toggleSecret()
    toggleLogin()
}

function toggleLogin() {
    var loginContainer = document.querySelector('.login-container')
    // loginContainer.hidden = !loginContainer.hidden;
    loginContainer.classList.toggle('hide')
}
function renderLogin() {
    var loginContainer = document.querySelector('.login-container')
    loginContainer.hidden = false;
}
function renderSecret() {
    var secretContainer = document.querySelector('.secret-container')
    secretContainer.innerHTML =
        `<h1>${gUser.name} is logged</h1>
    <img src="imgs/secret.jpg" class="secretImg">
    <button class="logout" onclick="onLogoutClick()">Logout</button>
    ${(gUser.isAdmin) ? '<a id="admin-btn" class="logout" href="admin.html">Admin console</a>' : ''}`
    toggleSecret();
}
function toggleSecret() {
    var secretContainer = document.querySelector('.secret-container')
    secretContainer.style.display = (secretContainer.style.display==='flex')? 'none':'flex'
    secretContainer.hidden = !secretContainer.hidden;
}