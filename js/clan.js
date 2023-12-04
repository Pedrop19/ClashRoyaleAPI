let URL = "http://localhost:3000/api/clans";
// <!-- "items": [
// {
//   "tag": "#QJJRVJU",
//   "name": "Spain",
//   "type": "inviteOnly",
//   "badgeId": 16000172,
//   "clanScore": 74243,
//   "clanWarTrophies": 3658,
//   "location": {
//     "id": 57000218,
//     "name": "Spain",
//     "isCountry": true,
//     "countryCode": "ES"
//   },
//   "requiredTrophies": 6000,
//   "donationsPerWeek": 3300,
//   "clanChestLevel": 1,
//   "clanChestMaxLevel": 0,
//   "members": 50
// }, -->

let datosElement = document.querySelector('.datos');

async function fetchData() {
    try {

        let nameClan = localStorage.getItem('clan');
        console.log(nameClan);

        let response = await fetch(URL, {
            method: 'GET',
            headers: {
                'nameClan': nameClan
            }
        });

        if (response.ok) {
            let jsonResponse = await response.json();
            let clans = jsonResponse.items;
            let clan = clans[0];

            datosElement.innerHTML = `
            <h1>Information about Clan: </h1>
                <p>Name: ${clan.name}</p>
                <p>Clan's Tag: ${clan.tag}</p>
                <p>Type: ${clan.type}</p>
                <p>Clan Score: ${clan.clanScore}</p>
                <p>Clan's War Trophies: ${clan.clanWarTrophies}</p>
                <p>Donations per Week: ${clan.donationsPerWeek}</p>
                <p>Required Trophies: ${clan.requiredTrophies}</p>
                <p>Members: ${clan.members}</p>
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