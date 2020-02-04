'use strict'

function init() {
    loadData();
    renderTodos()
}


function renderTotals() {
    var elTotalSpan = document.querySelector('#total-todos');
    var elActiveSpan = document.querySelector('#active-todos');

    elTotalSpan.innerHTML = getTotalTodosCount();
    elActiveSpan.innerHTML = getActiveTodosCount();
}

function renderTodosList() {
    var elTodos = document.querySelector('.todos');
    var todos = getTodosToRender();
    if (!todos.length) var strLis = ['<li>There is nothing to do</li>']
    else{
        var strLis = todos.map(function (todo) {
            return `<li class="todo ${todo.isDone ? 'done' : ''}" onclick="onTodoClicked(${todo.id})">
            <span class="delete" onclick="onDeleteClick(${todo.id} , event)">🗑️</span>
                        ${todo.title} 
                    </li>\n`;
        })
    }
    
    elTodos.innerHTML = strLis.join('');
}

function renderTodos() {
    renderTodosList();
    renderTotals();
}

function onDeleteClick(todoID, event) {
    var elModal = document.querySelector('.modal-popup')
    var elConfirm = elModal.querySelector('#confirm')
    elModal.style.display = 'flex'
    elConfirm.dataset.dataId = todoID
    event.stopPropagation();
}
function onDeleteConfirm(todoID){
    console.log(todoID)
    deleteTodo(+todoID);
    document.querySelector('.modal-popup').style.display = 'none'
    renderTodos();
}

function onTodoClicked(todoID) {

    toggleDone(todoID);
    renderTodos();
}

function onAddClick() {
    var importance=1
    var elTxtTodo = document.querySelector('#todo-title');
    var elChkBoxs = document.querySelectorAll('input[name="importance"]');
    var newTodoTitle = elTxtTodo.value;
    if (!newTodoTitle) return
    elChkBoxs.forEach(function(input){
        if(input.checked) importance = parseInt(input.value)
    })
   
    elTxtTodo.value = ''
    addTodo(newTodoTitle,importance);

    renderTodos();
}

function onStatusFilterChange(elStatusFilter) {
    var filterByStatus = elStatusFilter.value;
    setFilterStatus(filterByStatus);
    renderTodos();
}
function onStatusSortChange(elStatusSort){
    var sortByStatus = elStatusSort.value;
    setSortStatus(sortByStatus)
    renderTodos();
}