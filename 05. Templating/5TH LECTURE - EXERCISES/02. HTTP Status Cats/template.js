(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        const articleCats = document.getElementById('allCats');
        const scriptTemplate = document.getElementById('cat-template');
        let template = Handlebars.compile(scriptTemplate.innerHTML);
        articleCats.innerHTML = template({ cats });

        articleCats.addEventListener('click', (e) => {
            if (e.target.classList.contains('showBtn')) {
                const divStatus = e.target.nextElementSibling;
                if (divStatus.style.display === 'block') {
                    divStatus.style.display = 'none';
                    e.target.textContent = 'Show status code';
                } else {
                    divStatus.style.display = 'block';
                    e.target.textContent = 'Hide status code';
                }
                return;
            } else {
                return;
            }
        })
    }

})();