function loadRepos() {
	const repos = document.getElementById("repos");

	const usernameEl = document.getElementById("username");
	const username = usernameEl.value;

	repos.innerHTML = '<h1 id="loading">Loading...</h1>';
	const url = (`https://api.github.com/users/${username}/repos`);
	fetch(url)
		.then(res => res.json())
		.then(data => {
			document.getElementById('loading').remove();
			data.forEach(item => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = item.html_url;
				a.innerHTML = item.full_name;
				li.appendChild(a);
				repos.appendChild(li);
			})
		})
}