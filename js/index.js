let searchClanElement = document.querySelector(".search-clan");
let buscarClanElement = document.querySelector(".buscar-clan");
let searchPlayerElement = document.querySelector(".search-player");
let buscarPlayerElement = document.querySelector(".buscar-player");

buscarPlayerElement.addEventListener("click", () => {
  if(searchPlayerElement.value == "") {
    alert("Ingrese un tag de jugador")
  }else{
    localStorage.setItem("player", searchPlayerElement.value);
    window.location.href = "./Datos/user.html";
  }
});

buscarClanElement.addEventListener("click", () => {
  if(searchClanElement.value == "") {
    alert("Ingrese un nombre de clan")
  }else{
    localStorage.setItem("clan", searchClanElement.value);
    window.location.href = "./Datos/clan.html";
  }
});


function ClansforName(name, data) {
    let clan = data.find(clan => clan.name == name);
    return clan;
}