function attachEvents() {
    const locationInput = document.getElementById('location');
    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', showWeather);

    const urlLocations = 'https://judgetests.firebaseio.com/locations.json';

    const urlTodayWeather = 'https://judgetests.firebaseio.com/forecast/today/';
    const url3DayWather = 'https://judgetests.firebaseio.com/forecast/upcoming/';
    
    const divForecast = document.getElementById('forecast');

    const currentWeather = document.getElementById('current');
    const upcomingWeather = document.getElementById('upcoming');

    const weatherSymbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }

    async function showWeather() {

        currentWeather.innerHTML = '';
        upcomingWeather.innerHTML = '';

        let todayWeatherURL = '';
        let upcomingWeatherURL = '';

        try {
            const response = await fetch(urlLocations);
            const data = await response.json();
            // console.log(data);

            for (const obj of data) {
                if (obj.name === locationInput.value) {
                    todayWeatherURL = urlTodayWeather + `${obj.code}.json`;
                    upcomingWeatherURL = url3DayWather + `${obj.code}.json`;
                    break;
                }
            }

            // console.log(urlTodayWeather);
            // console.log(url3DayWather);

            const todayWatherResponse = await fetch(todayWeatherURL);
            const dataForToday = await todayWatherResponse.json();

            const threeDayWeatherResponse = await fetch(upcomingWeatherURL);
            const dataThreeDays = await threeDayWeatherResponse.json();

            // console.log(dataForToday);
            // console.log(dataThreeDays);

            setTodayWeather(dataForToday);
            set3DayWeather(dataThreeDays);

            divForecast.style.display = 'block';

        } catch (err) {
            console.log(err);
        }
    }

    function setTodayWeather(data) {
        const innerDiv = document.createElement('div');
        innerDiv.classList = 'forecasts';

        let spanSymbol = document.createElement('span');
        spanSymbol.classList = 'condition symbol';
        spanSymbol = setSymbol(data.forecast, spanSymbol);

        const spanCondition = document.createElement('span');
        spanCondition.classList = 'condition';

        const spanLocation = document.createElement('span');
        const spanTemperature = document.createElement('span');
        const spanWeather = document.createElement('span');

        spanLocation.classList = 'forecast-data';
        spanTemperature.classList = 'forecast-data';
        spanWeather.classList = 'forecast-data';

        spanLocation.innerHTML = data.name;
        spanTemperature.innerHTML = `${data.forecast.low}${weatherSymbols.Degrees}/${data.forecast.high}${weatherSymbols.Degrees}`;
        spanWeather.innerHTML = data.forecast.condition;

        spanCondition.appendChild(spanLocation);
        spanCondition.appendChild(spanTemperature);
        spanCondition.appendChild(spanWeather);

        innerDiv.appendChild(spanSymbol);
        innerDiv.appendChild(spanCondition);

        const divLabel = document.createElement('div');
        divLabel.classList = 'label';
        divLabel.textContent = 'Current conditions';

        currentWeather.appendChild(divLabel);
        currentWeather.appendChild(innerDiv);
    }

    function set3DayWeather(data) {
        // upcoming weather

        const innerDiv = document.createElement('div');
        innerDiv.classList = 'forecast-info';

        data.forecast.forEach(condition => {
            const span = document.createElement('span');
            span.classList = 'upcoming';
            
            let spanSymbol = document.createElement('span');
            spanSymbol.classList = 'symbol';
            spanSymbol = setSymbol(condition, spanSymbol);
    
            const spanTemperature = document.createElement('span');
            const spanWeather = document.createElement('span');
    
            spanTemperature.classList = 'forecast-data';
            spanWeather.classList = 'forecast-data';
    
            spanTemperature.innerHTML = `${condition.low}${weatherSymbols.Degrees}/${condition.high}${weatherSymbols.Degrees}`;
            spanWeather.innerHTML = condition.condition;

            span.appendChild(spanSymbol);
            span.appendChild(spanTemperature);
            span.appendChild(spanWeather);

            innerDiv.appendChild(span);
        })

        const divLabel = document.createElement('div');
        divLabel.classList = 'label';
        divLabel.textContent = 'Three-day forecast';

        upcomingWeather.appendChild(divLabel);
        upcomingWeather.appendChild(innerDiv);
    }

    function setSymbol(data, span) {
        switch (data.condition) {
            case 'Sunny': span.innerHTML = weatherSymbols.Sunny; break;
            case 'Partly sunny': span.innerHTML = weatherSymbols["Partly sunny"]; break;
            case 'Overcast': span.innerHTML = weatherSymbols.Overcast; break;
            case 'Rain': span.innerHTML = weatherSymbols.Rain; break;
        }
        return span;
    }
}

attachEvents();