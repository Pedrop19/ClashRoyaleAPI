let URL = "http://localhost:3000/api/cards";
let selectElement = document.querySelector(".select-cards");

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




async function fetchData() {
  try {
    let response = await fetch(URL);

    if (response.ok) {
      let jsonResponse = await response.json();
      let cards = jsonResponse.items;
      console.log(cards);
      cards.sort((a, b) => a.name.localeCompare(b.name));
      let options = cards.map(card => `<option value="${card.id}">${card.name}</option>`);
      selectElement.innerHTML = options.join('');
      
      dbPromise.then(db => {
        let tx = db.transaction('cards', 'readonly');
        let store = tx.objectStore('cards');
        let index = store.index('name');
        let request = index.getAll();

        request.onsuccess = function () {
          let cardsFavorite = request.result;
          console.log(cardsFavorite);

          selectElement.addEventListener('change', () => {
            let cardsContainer = document.querySelector('.cartas');
            cardsContainer.innerHTML = '';
  
            let card = cards.find(card => card.id == selectElement.value);
            if (cardsFavorite.find(cardFavorite => cardFavorite.id == card.id)) {
              card.favorite = true;
            } else {
              card.favorite = false;
            }
  
            let isFavorite = card.favorite;
  
            let cardElement = document.createElement('div');
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
            let userActive = localStorage.getItem('user');

            if(userActive){
  
            let favoriteElement = cardElement.querySelector(".favorite");
  
            favoriteElement.addEventListener("click", () => {
              let card = cards.find(card => card.id == selectElement.value);
              if(!card.favorite) {
              dbPromise.then(db => {
                let tx = db.transaction('cards', 'readwrite');
                let store = tx.objectStore('cards');
                let request = store.put({
                  id: card.id,
                  name: card.name,
                  elixirCost: card.elixirCost,
                  maxLevel: card.maxLevel,
                  iconUrls: card.iconUrls,
                  favorite: true
                });
  
                request.onsuccess = function () {
                  console.log('Carta actualizada');
                };
              }).catch(error => {
                console.error('Error opening database:', error);
              });
  
              if (favoriteElement.style.filter == "grayscale(0%)") {
                favoriteElement.style.filter = "grayscale(100%)";

              } else {
                favoriteElement.style.filter = "grayscale(0%)";
              }
            }else{
              dbPromise.then(db => {
                card = cards.find(card => card.id == selectElement.value);
                let tx = db.transaction('cards', 'readwrite');
                let store = tx.objectStore('cards');
                let request = store.delete(card.id);

                request.onsuccess = function () {
                  console.log('Carta eliminada');
                  window.location.reload();
                };
              }).catch(error => {
                console.error('Error opening database:', error);
              });
            }
            });
          }else{
            let favoriteElement = cardElement.querySelector(".favorite");
            favoriteElement.addEventListener("click", () => {
              alert("You must be logged in to add favorites");
            });
          }
            
          });
        };
      }).catch(error => {
        console.error('Error opening database:', error);
      } );
    }
  } catch (error) {
    console.log(error);
  }
}

fetchData();

