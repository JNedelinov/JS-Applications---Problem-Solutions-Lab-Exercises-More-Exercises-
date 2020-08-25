(async function () {
    const fomrDiv = document.getElementById('form');
    await fetch('./form-template.hbs')
        .then(res => res.text())
        .then(formTemplate => {
            const template = Handlebars.compile(formTemplate);
            fomrDiv.innerHTML = template();
        })
        .catch(err => alert(`${err.message}`));

    const inputEl = fomrDiv.querySelector('#towns');
    const loadBtn = fomrDiv.querySelector('#btnLoadTowns');

    const rootEl = document.getElementById('root');

    loadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (inputEl.value !== '') {
            const inputArr = inputEl.value.split(', ');
            for (const city of inputArr) {
                if (city.includes(',') || city.includes(' ')) { alert('You are supposed to separate each town with comma and space (Sofia, Varna, Monaco)!'); return; }
            }
            for (const city of inputArr) {
                if ((/[a-z]/).test(city[0])) { alert('You are supposed to type in each city with upper case letter!'); return; }
            }

            const obj = { cities: [] };
            inputArr.forEach((city, index) => {
                obj.cities.push(city);
            });

            const { cities } = obj;

            fetch('./ul-template.hbs')
                .then(res => res.text())
                .then(ulTemplate => {
                    const template = Handlebars.compile(ulTemplate);
                    rootEl.innerHTML = template({ cities });
                })
                .catch(err => {
                    alert(`${err.message}`);
                })
        }
    });
}())