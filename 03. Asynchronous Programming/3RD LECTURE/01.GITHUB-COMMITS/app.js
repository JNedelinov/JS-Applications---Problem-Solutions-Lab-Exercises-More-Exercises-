function loadCommits() {
    // Try it with Fetch API
    const usernameInput = document.getElementById('username');
    const repoInput = document.getElementById('repo');
    const ul = document.getElementById('commits');

    let baseUrl = null

    if (usernameInput.value !== '' && repoInput.value !== '') {
        baseUrl = `https://api.github.com/repos/${usernameInput.value}/${repoInput.value}/commits`;

        ul.innerHTML = '';

        fetch(baseUrl)
            .then((response) => {
                if (!response.ok) {
                    throw Error(`Error: ${response.status} (${response.statusText})`);
                }
                return response.json();
            }).catch(response => {
                return Promise.reject(response);
            }).then((result) => {
                const data = result;
                Object.values(data).forEach(object => {
                    const li = document.createElement('li');
                    li.textContent = `${object.commit.author.name}: ${object.commit.message}`;
                    ul.appendChild(li);
                });
            })
            .catch(err => {
                const li = document.createElement('li');
                li.textContent = err;
                ul.appendChild(li);
            });
    }

}