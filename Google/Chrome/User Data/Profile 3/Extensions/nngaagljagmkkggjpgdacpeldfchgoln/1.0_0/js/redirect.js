window.onload = function() {
  const form         = document.getElementById('search-bar-form');
  const searchInput  = document.getElementById('search-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();

    loadConfig()
        .then(config => {
          location.href = 'https://search.quicktab.org/s?q=' + searchInput.value + '&cu=' + config.id + '&t=tab';
        })
        .catch(error => {
          console.error(error);
        });
  });
}

function loadConfig() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../config.json", true);
    xhr.responseType = "json";
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error("Error loading the configuration file"));
      }
    };
    xhr.send();
  });
}
