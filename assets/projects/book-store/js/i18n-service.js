var gTrans = {
    price: {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר',
    },
    title: {
        en: 'Title',
        es: 'Titulo',
        he: 'כותרת'
    },
    actions: {
        en: 'Actions',
        es: 'Acciones',
        he: 'פעולות',
    },
    'add-book': {
        en: 'Add Book',
        es: 'Agregar libro',
        he: 'הוסף ספר',
    },
    'add-new-book': {
        en: 'Add a new book',
        es: 'Agrega nuevo libro',
        he: 'הוסף ספר חדש'
    },
    'book-title': {
        en: 'Book title',
        es: 'Titulo',
        he: 'כותרת הספר',
    },
    'book-price': {
        en: 'Book price',
        es: 'Precio',
        he: 'מחיר ספר',
    },
    'book-url': {
        en: 'Book image URL',
        es: 'Imagen del libro',
        he: 'כתובת לתמונת הספר',
    },
    close: {
        en: 'Close',
        es: 'Cerar',
        he: 'סגור',
    },
    save: {
        en: 'Save',
        es: 'Guardar',
        he: 'שמור'
    },
    'book-new-price': {
        en: 'Books new price',
        es: 'Precio nuevo',
        he: 'מחיר חדש'
    },
    'book-old-price': {
        en: 'Books old price: ',
        es: 'Precio viejo: ',
        he: 'מחיר קודם: '
    },
    'book-change-price': {
        en: 'Change book price',
        es: 'Cambia el precio del libro',
        he: 'שנה את מחיר הספר'
    },
    'book-name': {
        en: 'Book name',
        es: 'Nombre del libro',
        he: 'שם הספר'
    },
    rate: {
        en: 'Rating (1-10)',
        es: 'Rating (1-10)',
        he: 'דירוג (1-10)'
    },
    read: {
        en: 'Read',
        es: 'Leer',
        he: 'קרא'
    },
    update: {
        en: 'Update',
        es: 'Actualizar',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        es: 'Borrar',
        he: 'מחק'
    },
    'delete-confirm': {
        en: 'Are you sure you want to delete this book?',
        es: 'Estas seguro que quieres borrar este libro',
        he: 'האם אתה בטוח שברצונך למחוק ספר זה?'
    },
    yes: {
        en: 'Yes',
        es: 'Si',
        he: 'כן'
    },
    no: {
        en: 'No',
        es: 'No',
        he: 'לא'
    }
}

var gCurrLang = 'en';

function doTrans() {//<option value="all" data-trans="filter-all">All</option>
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (element) {
        var transKey = element.dataset.trans;
        var translation = getTrans(transKey);
        element.innerText = translation
    });
}


function getTrans(transKey) {
    return gTrans[transKey][gCurrLang];
}


function setLang(lang) {
    gCurrLang = lang;
}
function getLang(){
    return gCurrLang
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(date) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(date);
}


function kmToMiles(km) {
    return km / 1.609;
}