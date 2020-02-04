var gTodos = [], gNextID = 1, gStatusFilter = 'all', gStatusSort = 'text'

function createTodo(title, importance) {
    var todo = {
        title,
        isDone: false,
        id: gNextID++,
        createdAt: Date.now(),
        importance
    }
    saveToStorage('gNextID', gNextID);
    return todo;
}

function saveTodos() {
    saveToStorage('todos', gTodos);
}

function loadData() {
    gTodos = loadFromStorage('todos', []);
    gNextID = loadFromStorage('gNextID', 1)

}

function getTodosToRender() {
    var filteredTodos = gTodos.filter(function (todo) {
        return ((gStatusFilter === 'all') ||
            (gStatusFilter === 'active' && !todo.isDone) ||
            (gStatusFilter === 'done' && todo.isDone))
    });
    switch (gStatusSort) {
        case 'text':
            return filteredTodos.sort(dynamicSort('title'))
            break;
        case 'created':
            return filteredTodos.sort(dynamicSort('created'))
            break;
        case 'importance':
            return filteredTodos.sort(dynamicSort('-importance'))
            break;
    }
}
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function findTodoById(todoID) {
    return gTodos.find(function (todo) {
        return todo.id === todoID
    });
}
function findTodoIndexById(todoID) {
    return gTodos.findIndex(function (todo) {
        return todo.id === todoID
    });
}

function toggleDone(todoID) {
    var todo = findTodoById(todoID);
    todo.isDone = !todo.isDone;
    saveTodos()
}

function addTodo(title, importance) {
    var newTodo = createTodo(title, importance);
    gTodos.push(newTodo);
    saveTodos()
}

function deleteTodo(todoID) {
    var todoIndex = findTodoIndexById(todoID);
    gTodos.splice(todoIndex, 1);
    saveTodos()
}

function setFilterStatus(statusFilter) {
    gStatusFilter = statusFilter;
}
function setSortStatus(statusSort) {
    gStatusSort = statusSort;
}

function getActiveTodosCount() {
    return gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count++;
        return count;
    }, 0);
}

function getTotalTodosCount() {
    return gTodos.length;
}