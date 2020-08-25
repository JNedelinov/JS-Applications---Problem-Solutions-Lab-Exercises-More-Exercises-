function attachEvents() {

    const textareaEl = document.getElementById('messages');

    const nameInputEl = document.getElementById('author');
    const messageInputEl = document.getElementById('content');

    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    sendBtn.addEventListener('click', sendMessage);
    refreshBtn.addEventListener('click', refresh);

    function sendMessage() {
        if (!nameInputEl || !messageInputEl) { alert('Please check the message fields again before trying to send a message!'); return; }

        const author = nameInputEl.value;
        const content = messageInputEl.value;

        const data = { author, content };

        fetch('http://localhost:8000/messenger', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .catch(err => console.error(err));

        nameInputEl.value = '';
        messageInputEl.value = '';
    }

    function refresh() {
        fetch('http://localhost:8000/messenger')
            .then(res => res.json())
            .then(data => dataProcedure(data))
            .catch(err => console.error(err));


    }

    function dataProcedure(data) {
        textareaEl.textContent = '';
        Object.keys(data).forEach(key => {
            textareaEl.textContent += `${data[key].author}: ${data[key].content}\n`;
        })
    }
}

attachEvents();