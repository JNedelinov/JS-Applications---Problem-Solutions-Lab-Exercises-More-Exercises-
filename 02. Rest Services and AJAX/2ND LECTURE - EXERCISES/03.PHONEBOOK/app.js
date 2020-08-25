function attachEvents() {
    const loadBtn = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', loadContacts);

    const createBtn = document.getElementById('btnCreate');
    createBtn.addEventListener('click', createContact);

    const phoneBookUl = document.getElementById('phonebook');

    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    const BASE_URL = 'http://localhost:8000/phonebook';


    function loadContacts() {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => loadData(data))
            .catch(err => console.log(err));
    }

    function loadData(data) {
        phoneBookUl.innerHTML = '';
        Object.keys(data).forEach(key => {
            const li = document.createElement('li');
            li.classList = key;
            li.textContent = `${data[key].person} ${data[key].phone}`;

            const button = document.createElement('button');
            button.textContent = 'Delete';
            button.addEventListener('click', deleteContact);

            li.appendChild(button);
            phoneBookUl.appendChild(li);
        });
    }

    function deleteContact(e) {
        const li = e.target.parentElement;
        const id = li.classList.value;

        fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => loadContacts(data))
            .catch(err => console.log(err))
    }

    function createContact() {
        if (personInput.value !== '' && phoneInput.value !== '') {
            const data = {
                person: personInput.value,
                phone: phoneInput.value,
            }

            fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => loadContacts(data))
                .catch(err => console.log(err));

            personInput.value = '';
            phoneInput.value = '';
        }
    }
}

attachEvents();