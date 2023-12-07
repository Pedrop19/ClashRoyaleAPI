let cardsContainer = document.querySelector('.cartas');
let cardElement = document.createElement('div');

let dbPromise = new Promise((resolve, reject) => {
    let request = indexedDB.open('cards', 1);
  
    request.onupgradeneeded = function (event) {
      let db = event.target.result;
  
      let store = db.createObjectStore('cards', { keyPath: 'id', autoIncrement: true });
  
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
    let tx = db.transaction('cards', 'readonly');
    let store = tx.objectStore('cards');
    let index = store.index('name');
    let request = index.getAll();
    request.onsuccess = function () {
        let cards = request.result;
        console.log(cards);


        cards.forEach(card => {
          let cardElement = document.createElement('div');
          let isFavorite = card.favorite;
          cardElement.classList.add('carta');
          cardElement.innerHTML = `
            <div class="favorite" style="filter: ${isFavorite ? 'grayscale(0%)' : 'grayscale(100%)'}">
              <img src="/img/stair.webp" width="20" alt="">
            </div>
            <div class="carta__img">
              <img src="${card.iconUrls.medium}" alt="">
            </div>
            <div class="carta__info fs-4">
              <h2 class="text-center">${card.name}</h2>
              <p class="text-center">Elixir Cost: <span id="elixir">${card.elixirCost}</span></p>
              <p class="text-center">Max Level: ${card.maxLevel}</p>
            </div>         
          `;

          cardsContainer.appendChild(cardElement);
        });

    };
    });