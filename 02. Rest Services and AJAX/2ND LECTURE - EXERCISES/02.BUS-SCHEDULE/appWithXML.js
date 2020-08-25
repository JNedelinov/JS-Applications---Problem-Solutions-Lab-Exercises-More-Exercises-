function solve() {
    // with XML
    const info = document.getElementById('info');
    const infoSpan = info.querySelector('span');

    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    const baseUrl = 'https://judgetests.firebaseio.com/schedule/{currentId}.json';

    const startingStop = 'https://judgetests.firebaseio.com/schedule/depot.json';

    const httpRequest = new XMLHttpRequest();

    let currId = null;

    function depart() {
        arriveButton.removeAttribute('disabled');
        departButton.setAttribute('disabled', 'true');

        httpRequest.addEventListener('readystatechange', () => {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                let obj = JSON.parse(httpRequest.responseText);
                infoSpan.textContent = `Next stop ${obj.name}`;
            } else if (httpRequest.readyState == 4 && httpRequest.status !== 200) {
                infoSpan.textContent = 'Error';
                return;
            }
        });
        if (infoSpan.textContent !== 'Not Connected') {
            let obj = JSON.parse(httpRequest.responseText);
            let nextStation = baseUrl.replace('{currentId}', obj.next);
            currId = obj.next;
            httpRequest.open('GET', nextStation);
        } else {
            httpRequest.open('GET', startingStop);
        }

        httpRequest.send();

    }

    function arrive() {
        departButton.removeAttribute('disabled');
        arriveButton.setAttribute('disabled', 'true');

        httpRequest.addEventListener('readystatechange', () => {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                let obj = JSON.parse(httpRequest.responseText);
                infoSpan.textContent = `Arriving at ${obj.name}`;
            }
        });
        if (!infoSpan.textContent.includes('Depot')) {
            let currentStop = baseUrl.replace('{currentId}', currId);
            httpRequest.open('GET', currentStop);
        } else {
            httpRequest.open('GET', startingStop);
        }

        httpRequest.send();

    }

    return {
        depart,
        arrive
    };
}

let result = solve();