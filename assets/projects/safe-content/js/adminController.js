function init() {
    loadUser();

    if (isAdmin()){
        loadUsers()
        renderTable()
    }
    else{
        window.location = "index.html";
    } 
}

function renderTable() {
    var elContainer = document.querySelector('.table-container');
    
    var users = getUsers()
    var htmls = users.map(function (user) {
        return `<tr>
            <td>${user.name}</td>
            <td>${user.password}</td>
            <td>${new Date(user.lastLogin)}</td>
            <td>${user.isAdmin}</td>
        </tr>`
    })
    elContainer.innerHTML = htmls.join('')
}
function onSortClick(sortBy){
    setSortStatus(sortBy)
    renderTable()
}
function onLogoutClick() {
    doLogout()
    window.location = "index.html"
}
function onShowAddUserModal(){
    var elModal = document.querySelector('#addUserModal')
    elModal.hidden = false
}
function onCloseAddUserModal(){
    var elModal = document.querySelector('#addUserModal')
    elModal.hidden = true
}
function onAddUser(){
    var username = document.querySelector('#username').value
    var password = document.querySelector('#password').value
    var isAdmin = document.querySelector('#is-admin').checked
    addUser(createUser(username,password,Date.now(),isAdmin))
    onCloseAddUserModal()
    saveUsers()
    renderTable()
}
