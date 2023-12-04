let URL = "http://localhost:3000/api/players";


let datosElement = document.querySelector('.front-container');

async function fetchData() {
    try {

        let playerTag = localStorage.getItem('player');
        console.log(playerTag);

        let response = await fetch(URL, {
            method: 'GET',
            headers: {
                'tagPlayer': playerTag
            }
        });

        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let player = jsonResponse;
            console.log(player);
            let cardsPlayer = player.cards.length;

            datosElement.innerHTML = `
            <div class="datos">
            <h1>Information</h1>
            <p>Username: ${player.name}</p>
            <p>Tag Player: ${player.tag}</p>
            <p>Trofeos: ${player.trophies}</p>
            </div>
            <div class="stats">
                <h1>Estadisticas</h1>
                <p>Battles Count: ${player.battleCount}</p>
                <p>Arena: ${player.arena.name}</p>
                <p>Wins: ${player.wins}</p>
                <p>Favourite Card: <img src='${player.currentFavouriteCard.iconUrls.medium}' width="100" alt=""></p>
                <p>3 Crown Wins: ${player.threeCrownWins}</p>
                <p>Donations: ${player.totalDonations}</p>
                <p>Cards Found: ${cardsPlayer}</p>
            </div>
            <div class="mazo">
                <h1>Actual Deck</h1>
                <table>
                    <tr>
                        <td><img src='${player.currentDeck[0].iconUrls.medium}' width="100" alt=""></td>
                        <td><img src='${player.currentDeck[1].iconUrls.medium}' width="100" alt=""></td>
                        <td><img src='${player.currentDeck[2].iconUrls.medium}' width="100" alt=""></td>
                        <td><img src='${player.currentDeck[3].iconUrls.medium}' width="100" alt=""></td>
                    </tr>
                    <tr>
                        <td><img src='${player.currentDeck[4].iconUrls.medium}' width="100" alt=""></td>
                        <td><img src='${player.currentDeck[5].iconUrls.medium}' width="100" alt=""></td>
                        <td><img src='${player.currentDeck[6].iconUrls.medium}' width="100" alt=""></td>
                        <td><img src='${player.currentDeck[7].iconUrls.medium}' width="100" alt=""></td>
                    </tr>
                </table>
            </div>
            <div class="nivel">
                <h1>Level: ${player.expLevel}</h1>
                <p>Exp: ${player.expPoints}</p>
            </div>
            `
        } else {
            throw new Error('Request failed!');
        }
    }
    catch (error) {
        console.log(error);
    }
}

fetchData();