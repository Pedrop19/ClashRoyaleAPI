let nombreElement = document.querySelector('#nombre');
let emailElement = document.querySelector('#email');
let usernameElement = document.querySelector('#user');
let passwordElement = document.querySelector('#password');
let buttonDeleteElement = document.querySelector('.btn-delete');

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

dbPromise.then((db) => {
    let transaction = db.transaction('users', 'readwrite');
    let store = transaction.objectStore('users');
    let request = store.openCursor();
    console.log(request);

    request.onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            let user = cursor.value;
            nombreElement.value = user.name;
            emailElement.value = user.email;
            usernameElement.value = user.user;
            passwordElement.value = user.password;
        } else {
            console.log('No se encontraron usuarios en la base de datos.');
        }
    };
}

).catch((error) => {
    console.log(error);
});

//Modificar usuario

let updateElement = document.querySelector('.btn-update');

updateElement.addEventListener('click', (event) => {
    event.preventDefault();

    dbPromise.then((db) => {
        let transaction = db.transaction('users', 'readwrite');
        let store = transaction.objectStore('users');
        let cursorRequest = store.openCursor();

        cursorRequest.onsuccess = function (event) {
            let cursor = event.target.result;

            if (cursor) {
                let user = cursor.value;
                user.name = nombreElement.value;
                user.email = emailElement.value;
                user.user = usernameElement.value;
                user.password = passwordElement.value;

                let updateRequest = cursor.update(user);

                updateRequest.onsuccess = function (event) {
                    alert('Usuario modificado correctamente');
                    window.location.href = '/index.html';
                };

                updateRequest.onerror = function (event) {
                    console.error("Error al actualizar el usuario:", event.target.error);
                };
            } else {
                console.log('No se encontraron usuarios en la base de datos.');
            }
        };

        cursorRequest.onerror = function (event) {
            console.error("Error al abrir el cursor:", event.target.error);
        };
    }).catch((error) => {
        console.error("Error al abrir la base de datos:", error);
    });
});



//Eliminar usuario
buttonDeleteElement.addEventListener('click', (event) => {
    event.preventDefault();

    dbPromise.then((db) => {
        let transaction = db.transaction('users', 'readwrite');
        let store = transaction.objectStore('users');
        let cursorRequest = store.openCursor();

        cursorRequest.onsuccess = function (event) {
            let cursor = event.target.result;

            if (cursor) {
                let user = cursor.value;
                let requestDelete = cursor.delete();
                localStorage.clear();

                requestDelete.onsuccess = function (event) {
                    alert('Usuario eliminado correctamente');
                    window.location.href = '/index.html';
                };

                requestDelete.onerror = function (event) {
                    console.error("Error al eliminar el usuario:", event.target.error);
                };
            } else {
                console.log('No se encontraron usuarios en la base de datos.');
            }
        };

        cursorRequest.onerror = function (event) {
            console.error("Error al abrir el cursor:", event.target.error);
        };
    }).catch((error) => {
        console.error("Error al abrir la base de datos:", error);
    });
});
