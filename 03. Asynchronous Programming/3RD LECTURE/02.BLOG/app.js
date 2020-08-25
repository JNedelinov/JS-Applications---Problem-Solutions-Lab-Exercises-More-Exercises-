function attachEvents() {
    
    const loadPostsBtn = document.getElementById('btnLoadPosts');
    loadPostsBtn.addEventListener('click', loadPosts);

    const viewBtn = document.getElementById('btnViewPost');
    viewBtn.addEventListener('click', viewPost);

    const selectPosts = document.getElementById('posts');

    const postTile = document.getElementById('post-title');

    const ulBody = document.getElementById('post-body');
    const ulComments = document.getElementById('post-comments');

    const baseUrl = 'https://blog-apps-c12bf.firebaseio.com/';

    let db = null;

    function viewPost() {
        // postTile.textContent = 'Post Details';
        ulBody.innerHTML = '';
        ulComments.innerHTML = '';

        const indexOfSelectedOption = selectPosts.selectedIndex;
        const currOption = document.querySelector(`#posts > option:nth-child(${indexOfSelectedOption+1})`);
        const currOptionValue = currOption.value;

        // postTile.textContent = currOption.textContent;
        // ulBody.textContent = db[currOptionValue].

        
        fetch(`${baseUrl}posts/${currOptionValue}.json`)
            .then(response => response.json())
            .then(obj => {
                postTile.textContent = obj.title.toUpperCase();
                const li = document.createElement('li');
                li.textContent = obj.body;
                ulBody.appendChild(li);
                Object.keys(obj.comments || {}).forEach(comment => {
                    const li = document.createElement('li');
                    li.textContent = obj.comments[comment].text;
                    ulComments.appendChild(li);
                });
            })
            .catch(err => console.error(err)); 

    }

    function loadPosts() {
        fetch(`${baseUrl}posts.json`)
            .then(response => response.json())
            .then(dataObj => showInfo(dataObj))
            .catch(err => console.error(err));
    }

    function showInfo(data) {
        db = data;
        Object.keys(data).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = (data[key].title).toUpperCase();
            selectPosts.appendChild(option);
        })
    }

}

attachEvents();