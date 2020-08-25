function getInfo() {
    // with fetch
    const ids = [1287, 1308, 1327, 2334];

    const idBus = document.getElementById('stopId');

    const busName = document.getElementById('stopName');
    const ul = document.getElementById('buses');

    let url = null;

    if (idBus.value !== '') {

        ul.innerHTML = '';

        if (!ids.includes(Number(idBus.value))) {
            busName.textContent = 'Error';
            return;
        }

        url = `https://judgetests.firebaseio.com/businfo/${idBus.value}.json`;

        fetch(url)
            .then((response) => response.json()) // = JSON.parse();
            .then((result) => showInfo(result));
    }

    function showInfo(data) {
        busName.textContent = data.name;

        Object.keys(data.buses).forEach(bus => {
            let listItem = document.createElement('li');
            listItem.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
            document.getElementById('buses').appendChild(listItem);
        })
    }
}


