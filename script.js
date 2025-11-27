let pokemon1 = [];

async function fetchPokeData() {
  for (let i = 0; i < 20; i++) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${i + 387}`
    );
    const eachPokeData = await response.json();

    pokemon1.push({
      name: eachPokeData.name,
      index: eachPokeData.id,
      type: eachPokeData.types,
      sprite: eachPokeData.sprites.front_default,
    });
    renderEachCard();
  }
}

function renderEachCard() {
  const pokedexTargetRef = document.getElementById("pokemonCardsTarget");
  pokedexTargetRef.innerHTML = "";
  for (let pokeIndex = 0; pokeIndex < pokemon1.length; pokeIndex++) {
    pokedexTargetRef.innerHTML += getCardTemplate(pokeIndex);
    document.getElementById(`pokeName(${pokeIndex})`).innerHTML =
      pokemon1[pokeIndex].name.charAt(0).toUpperCase() +
      pokemon1[pokeIndex].name.substr(1);
    document.getElementById(`pokeId(${pokeIndex})`).innerHTML =
      pokemon1[pokeIndex].index;
    renderEachCardType(pokeIndex);
  }
}

function getCardTemplate(pokeIndex) {
  return /*html*/ `
    <div class="single-cards">
    <img id="pokeSprite(${pokeIndex})" src=""></img>
    <p  id="pokeName(${pokeIndex})"></p>
    <p id="pokeId(${pokeIndex})"></p>
    <p id="pokeType(${pokeIndex})"></p> 
    </div>
    `;
}

function renderEachCardType(pokeIndex) {
  let typeTemplate = document.getElementById(`pokeType(${pokeIndex})`);
  for (let j = 0; j < pokemon1[pokeIndex].type.length; j++) {
    typeTemplate.innerHTML += getTypeTemplate(pokemon1[pokeIndex].type[j].type);
  }
  document
    .getElementById(`pokeSprite(${pokeIndex})`)
    .setAttribute("src", pokemon1[pokeIndex].sprite);
}

function getTypeTemplate(type) {
  return /*html*/ `
        <p> ${type.name}</p>
    `;
}

const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
