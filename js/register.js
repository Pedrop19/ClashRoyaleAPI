let nombre = document.querySelector('#nombre');
let email = document.querySelector('#email');
let user = document.querySelector('#user');
let password = document.querySelector('#password');
let password2 = document.querySelector('#password2');
let btnregistrar = document.querySelector('.btn-registrar');

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

btnregistrar.addEventListener('click', () => {
    let nombreValue = nombre.value;
    let emailValue = email.value;
    let userValue = user.value;
    let passwordValue = password.value;
    let password2Value = password2.value;

    if (nombreValue === '' || emailValue === '' || userValue === '' || passwordValue === '' || password2Value === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    if (passwordValue !== password2Value) {
        alert('Las contraseñas no coinciden');
        return;
    }

    let player = {
        name: nombreValue,
        email: emailValue,
        user: userValue,
        password: passwordValue
    }

    dbPromise.then(db => {
        let tx = db.transaction('users', 'readwrite');
        let store = tx.objectStore('users');
        store.add(player);
        return tx.complete;
    }).then(() => {
        console.log('Player added');
        window.location.href = '../index.html';
    }).catch(error => {
        console.log(error);
    });
});