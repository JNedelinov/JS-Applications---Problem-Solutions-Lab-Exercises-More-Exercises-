(function () {
    const appEl = document.getElementById('app');
    const loaderTemplateScriptEl = document.getElementById('loader-template');

    // const appContainerEl = document.getElementById('app-container');
    // const loginContainerEl = document.getElementById('login-container');

    // const appLoaderEl = document.getElementById('app-loader');
    // const genericLoginError = document.getElementById('generic-login-error');

    // const userEmailEl = document.getElementById('user-email');
    // const logoutBtn = document.getElementById('logout-btn');

    // const registerBtn = document.getElementById('register-btn');
    // const loginBtn = document.getElementById('login-btn');
    // const emailInputEl = document.getElementById('email');
    // const passwordInputEl = document.getElementById('password');

    // function toggleLoader() {
    //     if (appLoaderEl.classList.contains('hidden')) {
    //         appLoaderEl.classList.remove('hidden');
    //         return;
    //     }
    //     appLoaderEl.classList.add('hidden');
    // }



    function afterloginRegisterRenderFactory({ loginRegisterTemplate, loaderTemplate }) {
        return function afterloginRegisterRender() {

            const registerBtn = document.getElementById('register-btn');
            const loginBtn = document.getElementById('login-btn');

            const emailInputEl = document.getElementById('email');
            const passwordInputEl = document.getElementById('password');

            loginBtn.addEventListener('click', function loginHandler() {
                const email = emailInputEl.value;
                const password = passwordInputEl.value;
                if (!email || !password) {
                    alert('Please provide credentials!');
                    return;
                }

                render(loaderTemplate)

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .catch(function (error) {
                        render(loginRegisterTemplate, { error: error.message, email, password }, afterloginRegisterRender);
                    });

            });

            registerBtn.addEventListener('click', function registerHandler() {
                const email = emailInputEl.value;
                const password = passwordInputEl.value;
                if (!email || !password) {
                    alert('Please provide credentials!');
                    return;
                }

                render(loaderTemplate)

                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(function (error) {
                        render(loginRegisterTemplate, { error: error.message, email, password }, afterloginRegisterRender);
                    });
            });
        }
    }

    function afterAuthContentRenderFactory() {
        return function afterAuthContentRender() {
            const logoutBtn = document.getElementById('logout-btn');
            logoutBtn.addEventListener('click', function logoutHandler(e) {
                e.preventDefault();
                firebase.auth().signOut().catch(function (error) {
                    console.error(error);
                })
            });
        }
    }

    function render(template, data, ...cbs) {
        appEl.innerHTML = template(data);
        cbs.forEach(fn => fn());
    }

    function init() {

        const generateTemplate = str => Handlebars.compile(str);
        const loaderTemplate = generateTemplate(loaderTemplateScriptEl.innerHTML);
        render(loaderTemplate);

        Promise.all([
            fetch('./templates/auth-content.hbs').then(res => res.text()),
            fetch('./templates/login-register-form.hbs').then(res => res.text()),
        ])
            .then(templateStrings => templateStrings.map(generateTemplate))
            .then(([authContentTemplate, loginRegisterTemplate]) => {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        render(authContentTemplate, { email: user.email }, afterAuthContentRenderFactory());
                    } else {
                        render(loginRegisterTemplate, {}, afterloginRegisterRenderFactory({
                            authContentTemplate,
                            loginRegisterTemplate,
                            loaderTemplate
                        }));
                    }
                });
            });
    }

    init();
}());