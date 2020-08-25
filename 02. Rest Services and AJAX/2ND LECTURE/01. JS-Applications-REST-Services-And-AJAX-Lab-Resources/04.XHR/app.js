function loadRepos() {
   const url = 'https://api.github.com/users/testnakov/repos';
   const div = document.getElementById('res');
   // const xmlHttpRequest = new XMLHttpRequest();
   // xmlHttpRequest.addEventListener('readystatechange', () => {
   //    if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
   //       div.textContent = xmlHttpRequest.responseText;
   //    }
   // });

   // xmlHttpRequest.open('GET', url);
   // xmlHttpRequest.send();

   fetch(url)
      .then(res => {
         if (res.status === 200) {
            return res.json();
         } else if (res.status === 401) {
            console.warn("UNAUTHORIZED");
         } else if (res.status === 500) {
            console.error('Server Error');
         }
      }).then(data => {
         if (!data) { return; }
         console.log(data)
      });
}