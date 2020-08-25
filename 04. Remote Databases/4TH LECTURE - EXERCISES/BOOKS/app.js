// BEFORE WATCHING THE LAST TWO LECTURES WITH VICTOR, WHERE HE SHOWED US HOW TO SEPARATE OUR FUNCTIONALITY

const BASE_URL = 'https://api.backendless.com/3E035CB4-80CB-7C15-FFDC-83FB58A2D500/A3391EA8-0C25-454B-81CC-816201DA6E5B';

const loadAllBooksBtn = document.getElementById('loadBooks');

const table = document.querySelector('table');

const tbody = document.querySelector('body table tbody');

tbody.innerHTML = '';

const submitForm = document.getElementById('submit-form');
const submitFormEls = getAllElements(submitForm)

const editForm = document.getElementById('edit-form');
const editFormEls = getAllElements(editForm);

loadAllBooksBtn.addEventListener('click', listAllBooks);
submitFormEls.submitBtn().addEventListener('click', postBook);
editFormEls.submitBtn().addEventListener('click', requestTheEdit);

function listAllBooks() {
    table.classList.remove('hidden');
    submitForm.classList.remove('hidden');
    editForm.classList.add('hidden');
    tbody.innerHTML = '';

    fetch(`${BASE_URL}/data/books`)
        .then(res => res.json())
        .then(data => loadBooks(data))
        .catch(err => console.log(err));
}

function postBook(e) {
    e.preventDefault();

    if (!submitFormEls.titleInputEl().value ||
        !submitFormEls.authorInputEl().value ||
        !submitFormEls.isbnInputEl().value) { alert('Check if you have filled all of the fields and then try again!'); return; }

    const title = submitFormEls.titleInputEl().value;
    const author = submitFormEls.authorInputEl().value;
    const isbn = submitFormEls.isbnInputEl().value;

    const data = { title, author, isbn };

    fetch(`${BASE_URL}/data/books`, {
        method: "POST",
        headers: {
            "Constent-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

    submitFormEls.titleInputEl().value = '';
    submitFormEls.authorInputEl().value = '';
    submitFormEls.isbnInputEl().value = '';
}

function editBook(e) {

    submitForm.classList.add('hidden');
    editForm.classList.remove('hidden');

    const tr = e.target.parentElement.parentElement;
    const tds = tbody.querySelectorAll(`tr:nth-child(${tr.rowIndex}) td`);

    editFormEls.titleInputEl().value = tds[0].textContent;
    editFormEls.authorInputEl().value = tds[1].textContent;
    editFormEls.isbnInputEl().value = tds[2].textContent;
}

function deleteBook(e) {
    const tr = e.target.parentElement.parentElement;
    const td = tbody.querySelector(`tr:nth-child(${tr.rowIndex}) td:nth-child(${3})`);
    const isbnCurrBook = td.textContent;

    tbody.removeChild(tr);

    fetch(`${BASE_URL}/data/books`)
        .then(res => res.json())
        .then(data => deletion(data, isbnCurrBook))
        .catch(err => console.error(err));
}

function loadBooks(data) {
    Object.entries(data).forEach(([key, value]) => {
        const tr = document.createElement('tr');

        const tdTitle = document.createElement('td');
        const tdAuthor = document.createElement('td');
        const tdISBN = document.createElement('td');

        const tdButtons = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editBook);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteBook);

        tdButtons.appendChild(editBtn);
        tdButtons.appendChild(deleteBtn);

        tdTitle.textContent = value.title;
        tdAuthor.textContent = value.author;
        tdISBN.textContent = value.isbn;

        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdISBN);

        tr.appendChild(tdButtons);

        tbody.appendChild(tr);
    });

}

function requestTheEdit(e) {
    e.preventDefault();

    const trs = tbody.querySelectorAll('tr');
    let trIndex = null;

    for (const tr of trs) {
        if (tr.textContent.includes(editFormEls.isbnInputEl().value)) {
            trIndex = tr.rowIndex;
            break;
        }
    }

    const tds = tbody.querySelectorAll(`tr:nth-child(${trIndex}) td`);

    const isbnCurrBook = tds[2].textContent;

    fetch(`${BASE_URL}/data/books`)
        .then(res => res.json())
        .then(data => updating(data, isbnCurrBook))
        .catch(err => console.error(err));
}

function updating(data, isbn) {
    for (const key in data) {
        if (data[key].isbn === isbn) {
            let id = data[key].objectId;

            let newData = {};

            if (!editFormEls.titleInputEl().value ||
                !editFormEls.authorInputEl().value ||
                !editFormEls.isbnInputEl().value) { alert('Check if you have filled all of the fields and then try again!'); return; }

            const title = editFormEls.titleInputEl().value;
            const author = editFormEls.authorInputEl().value;
            const isbn = editFormEls.isbnInputEl().value;

            newData = { title, author, isbn };

            fetch(`${BASE_URL}/data/books/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newData)
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.error(err));
            break;
        }
    }

    editFormEls.titleInputEl().value = '';
    editFormEls.authorInputEl().value = '';
    editFormEls.isbnInputEl().value = '';

    editForm.classList.add('hidden');
    submitForm.classList.remove('hidden');

    return;
}

function deletion(data, isbn) {
    for (const key in data) {
        if (data[key].isbn === isbn) {
            let id = data[key].objectId;
            fetch(`${BASE_URL}/data/books/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.error(err));
            return;
        }
    }
}

function getAllElements(form) {
    return {
        titleInputEl: () => form.querySelector('#title'),
        authorInputEl: () => form.querySelector('#author'),
        isbnInputEl: () => form.querySelector('#isbn'),
        submitBtn: () => form.querySelector('form>button')
    }
}