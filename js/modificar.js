let nombreElement = document.querySelector('#nombre');
let emailElement = document.querySelector('#email');
let usernameElement = document.querySelector('#user');
let passwordElement = document.querySelector('#password');

let dbPromise = new Promise((resolve, reject) => {
    let request = indexedDB.open('users', 2);
  
    request.onupgradeneeded = function (event) {
      let db = event.target.result;
  
      let store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
  
      store.createIndex('name', 'name', { unique: false });
    };
  
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  
    request.onerror = function (event) {
      reject(event.target.error);
    };
  });

    dbPromise.then(db => {
        let tx = db.transaction('users', 'readonly');
        let store = tx.objectStore('users');
        let index = store.index('name');
        let request = index.getAll();
        request.onsuccess = function () {
            let usuarios = request.result;
            console.log(usuarios);
            usuarios.forEach(usuario => {
                nombreElement.value = usuario.name;
                emailElement.value = usuario.email;
                usernameElement.value = usuario.user;
                passwordElement.value = usuario.password;
            });
        };
    });

let btnUpdate = document.querySelector('.btn-update');

btnUpdate.addEventListener('click', () => {
    let nombre = nombreElement.value;
    let email = emailElement.value;
    let username = usernameElement.value;
    let password = passwordElement.value;
    let id = 1;

    let dbPromise = new Promise((resolve, reject) => {
        let request = indexedDB.open('users', 1);
      
        request.onupgradeneeded = function (event) {
          let db = event.target.result;
      
          let store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      
          store.createIndex('name', 'name', { unique: false });
        };
      
        request.onsuccess = function (event) {
          resolve(event.target.result);
        };
      
        request.onerror = function (event) {
          reject(event.target.error);
        };
      });

    dbPromise.then(db => {
        let tx = db.transaction('users', 'readwrite');
        let store = tx.objectStore('users');
        let index = store.index('name');
        let request = index.getAll();
        request.onsuccess = function () {
            let usuarios = request.result;
            console.log(usuarios);
            usuarios.forEach(usuario => {
                let requestUpdate = store.put({
                    id: id,
                    name: nombre,
                    email: email,
                    username: username,
                    password: password
                });
                requestUpdate.onsuccess = function () {
                    console.log('Usuario actualizado');
                };
            });
        };
    });
});