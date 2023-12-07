let datos = document.querySelector('.datos');

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
            datos.innerHTML += `
                <div class="datos-usuario">
                    <h3>Nombre: ${usuario.name}</h3>
                    <h3>Email: ${usuario.email}</h3>
                    <h3>Usuario: ${usuario.user}</h3>
                </div>
            `;
        });
    };
});