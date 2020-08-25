import { monkeys } from './monkeys.js';

$(() => {
    renderMonkeys();

    function renderMonkeys() {
        const src = document.getElementById("monkey-template").innerHTML;
        let template = Handlebars.compile(src);
        const divMonkeys = document.querySelector('.monkeys');
        divMonkeys.innerHTML = template({ monkeys });

        divMonkeys.addEventListener('click', (e) => {
            if (e.target.nodeName === 'BUTTON') {
                const p = e.target.nextElementSibling;
                if (p.style.display === 'none') {
                    p.style.display = 'block'
                } else {
                    p.style.display = 'none';
                }
                return;
            }
        })
    }
})