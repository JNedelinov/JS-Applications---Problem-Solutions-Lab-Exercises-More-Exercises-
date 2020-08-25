import { pathToRegexp, match } from './node_modules/path-to-regexp/dist.es2015/index.js';

// 1. Да си направим функция, която се казва Sammy

/* const { pathToRegexp } = require("path-to-regexp"); */

function Sammy(selector, initFn) {

    const mainEl = document.querySelector('#main');

    const getPathCollection = [];
    const postPathCollection = [];
    let currentPath = undefined;

    function onAnchorClickHandler(e) {
        e.preventDefault();
        const target = e.target;
        const path = target.getAttribute('href');
        core.redirect(path);
        window.history.pushState(null, '', path); // 
    };

    function setupFormSubmissionHandlers(cb) {
        Array.from(document.querySelectorAll('form')).forEach(form => {
            if (form.hasAttribute('data-has-handler')) { return; }
            form.addEventListener('submit', cb);
            form.setAttribute('data-has-handler', true);
        })
    }

    function setupAnchorHandlers() {
        Array.from(document.querySelectorAll('a')).forEach(i => {
            if (i.hasAttribute('data-has-handler')) { return; }
            i.addEventListener('click', onAnchorClickHandler);
            i.setAttribute('data-has-handler', true);
        });
    }

    function setupListeners() {
        setupAnchorHandlers();

        window.addEventListener('popstate', function () {
            // window.location.pathname;
            core.redirect(window.location.pathname);
        })
    };

    const core = {
        get(path, fn) {
            // const re = pathToRegexp(path);
            const matchFn = match(path, { decode: decodeURIComponent });
            getPathCollection.push({ path, fn, matchFn });
        },
        load(url) {
            return fetch(url).then(res => {
                return res.json();
            });
        },
        post(path, fn) {
            const matchFn = match(path, { decode: decodeURIComponent });
            postPathCollection.push({ path, fn, matchFn });
        },
        redirect(path) {
            currentPath = path;
            let params;
            const pathObj = getPathCollection.find(i => {
                const data = i.matchFn(currentPath);
                if (data) { params = data.params };
                return !!data;
            });

            if (!pathObj) {
                console.error(`body 404 Not Found get ${currentPath}`);
                return;
            }

            pathObj.fn.call(core, { params });

            setupAnchorHandlers()
        },
        swap(htmlContent) {
            mainEl.innerHTML = htmlContent;
            setTimeout(setupAnchorHandlers, 0);
            setTimeout(() => setupFormSubmissionHandlers(this._formSubmissionHandler), 0);
        },
        _formSubmissionHandler(e) {
            e.preventDefault();
            const target = e.target;
            if (target.method.toLowerCase() !== "post") { return; }
            let params;
            const path = target.action.replace(location.protocol + '//' + location.host, '');
            const pathObj = postPathCollection.find(i => {
                const data = i.matchFn(path);
                if (data) { params = data.params };
                return !!data;
            });

            if (!pathObj) {
                console.error(`body 404 Not Found post ${target.action}`);
                return;
            }

            pathObj.fn.call(core, { params, form: target });
        }
    };

    const app = {
        run(path) {
            setupListeners();
            initFn.call(core);

            core.redirect(path);
        }
    };

    return app;
}

const app = Sammy('#main', function () {
    this.post('/test', function (context) {
        console.log(context);
    });

    this.get('/', function () {
        // this.swap('<h1>HOME PAGE</h1>');
        const ul = document.createElement('ul');
        this.load('https://jsonplaceholder.typicode.com/users').then(users => {
            users.forEach(user => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `/user/${user.id}`;
                a.textContent = user.email;
                li.appendChild(a);
                ul.appendChild(li);
            });
            const homePage = `${ul.outerHTML} <form method="post" action="/test"><input name="name" value=""></input><button>SAVE</button></form>`
            this.swap(homePage);
        });
    });
    this.get('/user/:id', function (context) {
        this.swap('<div>Loading...</div>');
        // console.log(context);
        this.load(`https://jsonplaceholder.typicode.com/users/${context.params.id}`)
            .then(user => { this.swap(`<h1>${user.email}</h1>`); })
    });
    this.get('/about', function () {
        this.swap('<h1>ABOUT PAGE</h1>');
    });
});

// Sammy e factory function, която ни конструира our app
// Логиката остава скрита от user-a
// Това, което ни конструира от друга страна е и facade

app.run(window.location.pathname);