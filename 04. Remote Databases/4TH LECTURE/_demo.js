(function () {
    const appContainerEl = document.getElementById('app-container');
    const loginContainerEl = document.getElementById('login-container');

    const appLoaderEl = document.getElementById('app-loader');
    const genericLoginError = document.getElementById('generic-login-error');

    const userEmailEl = document.getElementById('user-email');
    const logoutBtn = document.getElementById('logout-btn');

    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const emailInputEl = document.getElementById('email');
    const passwordInputEl = document.getElementById('password');

    function toggleLoader() {
        if (appLoaderEl.classList.contains('hidden')) {
            appLoaderEl.classList.remove('hidden');
            return;
        }
        appLoaderEl.classList.add('hidden');
    }

    loginBtn.addEventListener('click', function loginHandler() {
        genericLoginError.textContent = '';
        const email = emailInputEl.value;
        const password = passwordInputEl.value;
        if (!email || !password) {
            alert('Please provide credentials!');
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => toggleLoader())
            .catch(function (error) {
                toggleLoader();
                genericLoginError.textContent = error.message;
            });

    });

    logoutBtn.addEventListener('click', function logoutHandler(e) {
        e.preventDefault();
        firebase.auth().signOut().catch(function (error) {
            console.error(error);
        })
    });

    registerBtn.addEventListener('click', function registerHandler() {
        genericLoginError.textContent = '';
        const email = emailInputEl.value;
        const password = passwordInputEl.value;
        if (!email || !password) {
            alert('Please provide credentials!');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => toggleLoader())
            .catch(function (error) {
                toggleLoader();
                genericLoginError.textContent = error.message;
            });
    });

    function init() {
        firebase.auth().onAuthStateChanged(function (user) {
            console.log(user);
            if (user) {
                appContainerEl.classList.remove('hidden');
                loginContainerEl.classList.add('hidden');
                userEmailEl.textContent = user.email;
                // // User is signed in.
                // var displayName = user.displayName;
                // var email = user.email;
                // var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;
                // var isAnonymous = user.isAnonymous;
                // var uid = user.uid;
                // var providerData = user.providerData;
                // // ...

            } else {
                appContainerEl.classList.add('hidden');
                loginContainerEl.classList.remove('hidden');
            }

            appLoaderEl.classList.add('hidden');
        });

    }

    init();
}());