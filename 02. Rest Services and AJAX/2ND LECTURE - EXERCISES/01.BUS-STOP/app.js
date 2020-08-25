function getInfo() {
    // with XML
    const ids = [1287, 1308, 1327, 2334];

    const idBus = document.getElementById('stopId');

    const busName = document.getElementById('stopName');
    const ul = document.getElementById('buses');

    let url = null;
    const httpRequest = new XMLHttpRequest();

    if (idBus.value !== '') {

        ul.innerHTML = '';

        if (!ids.includes(Number(idBus.value))) {
            busName.textContent = 'Error';
            return;
        }

        url = `https://judgetests.firebaseio.com/businfo/${idBus.value}.json`;
        httpRequest.addEventListener('readystatechange', () => {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                let busObj = JSON.parse(httpRequest.responseText);
                busName.textContent = busObj.name;
                Object.keys(busObj.buses).forEach(bus => {
                    const li = document.createElement('li');
                    li.textContent = `Bus ${bus} arrives in ${busObj.buses[bus]} minutes`;
                    document.getElementById('buses').appendChild(li);
                });
            } else if (httpRequest.readyState == 4 && httpRequest.status !== 200) {
                busName.textContent = 'Error';
            }
        })
        httpRequest.open('GET', url);
        httpRequest.send();

    }
}


