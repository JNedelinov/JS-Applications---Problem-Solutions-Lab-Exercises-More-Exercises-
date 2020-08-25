function solve() {
    // with fetch
    const info = document.getElementById('info');
    const infoSpan = info.querySelector('span');

    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    const baseUrlForFetch = 'https://judgetests.firebaseio.com/schedule/';

    let busStopIdForFetch = 'depot';
    let busStopNameForFetch = '';

    function depart() {

        fetch(baseUrlForFetch + `${busStopIdForFetch}.json`)
            .then((response) => response.json())
            .then((response) => showBusInfo(response));

        function showBusInfo(data) {
            infoSpan.textContent = `Next stop ${data.name}`;
            busStopIdForFetch = data.next;
            busStopNameForFetch = data.name;
            switchBusState();
        }

    }

    function arrive() {

        fetch(baseUrlForFetch + `${busStopIdForFetch}.json`)
            .then((response) => response.json())
            .then((response) => showBusInfo(response));

        function showBusInfo(data) {
            infoSpan.textContent = `Arriving at ${busStopNameForFetch}`;
            switchBusState();
        }

    }

    function switchBusState() {
        const { disabled: isDisabled } = arriveButton;

        if (isDisabled) {
            arriveButton.removeAttribute('disabled');
            departButton.setAttribute('disabled', 'true');
        } else {
            departButton.removeAttribute('disabled');
            arriveButton.setAttribute('disabled', 'true');
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();