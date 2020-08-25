function attachEvents() {
    const BASE_URL = 'https://fisher-game.firebaseio.com';

    const mainFieldset = document.getElementById('main');

    const divCatches = document.getElementById('catches');

    const loadBtn = document.querySelector('button.load');
    loadBtn.addEventListener('click', loadCatches);

    const asideFieldSet = document.getElementById('addForm');
    const asideFieldsetEls = getElements(asideFieldSet);

    const addBtn = document.querySelector('button.add');
    addBtn.addEventListener('click', addCatch);

    function loadCatches() {
        // load all catches until this moment
        mainFieldset.querySelector('#catches').innerHTML = '';

        fetch(`${BASE_URL}/catches.json`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => allCatches(data))
            .catch(err => console.error(err));
    }

    function allCatches(data) {
        Object.keys(data).forEach(key => {
            const catchDiv = document.createElement('div');
            catchDiv.classList = 'catch';
            catchDiv.id = key;

            fillUpTheCatchDiv(data, key, catchDiv);

            const updateBtn = document.createElement('button');
            updateBtn.classList = 'update';
            updateBtn.textContent = 'Update';
            updateBtn.addEventListener('click', updateCatch);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList = 'delete';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', deleteCatch);

            catchDiv.appendChild(updateBtn);
            catchDiv.appendChild(deleteBtn);

            divCatches.appendChild(catchDiv);
        });
    }

    function fillUpTheCatchDiv(data, key, catchDiv) {
        for (let i = 0; i < 6; i++) {
            const label = document.createElement('label');
            const input = document.createElement('input');
            const hr = document.createElement('hr');

            switch (i) {
                case 0: {
                    label.textContent = 'Angler';
                    input.type = 'text';
                    input.classList = 'angler';
                    input.value = data[key].angler;
                }; break;
                case 1: {
                    label.textContent = 'Weight';
                    input.type = 'text';
                    input.classList = 'weight';
                    input.value = data[key].weight;
                }; break;
                case 2: {
                    label.textContent = 'Species';
                    input.type = 'text';
                    input.classList = 'species';
                    input.value = data[key].species;
                }; break;
                case 3: {
                    label.textContent = 'Location';
                    input.type = 'text';
                    input.classList = 'location';
                    input.value = data[key].location;
                }; break;
                case 4: {
                    label.textContent = 'Bait';
                    input.type = 'text';
                    input.classList = 'bait';
                    input.value = data[key].bait;
                }; break;
                case 5: {
                    label.textContent = 'Capture Time';
                    input.type = 'text';
                    input.classList = 'captureTime';
                    input.value = data[key].captureTime;
                }; break;
            }

            catchDiv.appendChild(label);
            catchDiv.appendChild(input);
            catchDiv.appendChild(hr);
        }
    }

    function addCatch() {
        // add a catch to the server
        let data = setData(asideFieldsetEls);

        fetch(`${BASE_URL}/catches.json`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(err => console.error(err));

        asideFieldsetEls.anglerInput().value = '';
        asideFieldsetEls.weightInput().value = '';
        asideFieldsetEls.speciesInput().value = '';
        asideFieldsetEls.locationInput().value = '';
        asideFieldsetEls.baitInput().value = '';
        asideFieldsetEls.captureTimeInput().value = '';
    }

    function getElements(htmlElement) {
        return {
            anglerInput() { return htmlElement.querySelector('input.angler'); },
            weightInput() { return htmlElement.querySelector('input.weight'); },
            speciesInput() { return htmlElement.querySelector('input.species'); },
            locationInput() { return htmlElement.querySelector('input.location'); },
            baitInput() { return htmlElement.querySelector('input.bait'); },
            captureTimeInput() { return htmlElement.querySelector('input.captureTime'); },
        }
    }

    function updateCatch(e) {
        // update catch info

        const divCatch = e.target.parentElement;
        const catchId = divCatch.id;

        const divCatchEls = getElements(divCatch);

        let data = setData(divCatchEls);

        fetch(`${BASE_URL}/catches/${catchId}.json`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(err => console.error(err));
    }

    function deleteCatch(e) {
        // delete catch info

        const divCatch = e.target.parentElement;
        const catchId = divCatch.id;

        fetch(`${BASE_URL}/catches/${catchId}.json`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .catch(err => console.error(err));

        divCatches.removeChild(divCatch);
    }

    function setData(htmlElement) {
        if (htmlElement.anglerInput().value !== '' &&
            htmlElement.weightInput().value > 0 &&
            htmlElement.speciesInput().value !== '' &&
            htmlElement.locationInput().value !== '' &&
            htmlElement.baitInput().value !== '' &&
            htmlElement.captureTimeInput().value > 0) {

            return {
                angler: htmlElement.anglerInput().value,
                weight: htmlElement.weightInput().value,
                species: htmlElement.speciesInput().value,
                location: htmlElement.locationInput().value,
                bait: htmlElement.baitInput().value,
                captureTime: htmlElement.captureTimeInput().value,
            }
        }
    }

}

attachEvents();

/* 
    Test1Angler
    1
    Test1Species
    Test1Location
    Test1Bait
    1

    Test2Angler
    2
    Test2Species
    Test2Location
    Test2Bait
    2
*/