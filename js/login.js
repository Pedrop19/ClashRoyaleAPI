let email = document.querySelector('#email');
let password = document.querySelector('#password');
let btnlogin = document.querySelector('.btn-logear');


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

btnlogin.addEventListener('click', () => {
    let emailValue = email.value;
    let passwordValue = password.value;

    if (emailValue === '' || passwordValue === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    dbPromise.then(db => {
        let tx = db.transaction('users', 'readonly');
        let store = tx.objectStore('users');
        let index = store.index('name');
        let request = index.getAll();

        request.onsuccess = function () {
            let users = request.result;
            console.log(users);

            let user = users.find(user => user.email == emailValue && user.password == passwordValue);
            console.log(user);

            if (user) {
                localStorage.setItem('user', user.name);
                window.location.href = '../index.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }
    });
});

