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
    renderEachCard(i);
  }
}

function renderEachCard(i) {
  const pokedexTargetRef = document.getElementById("pokemonCardsTarget");
  pokedexTargetRef.innerHTML = "";
  for (let pokeIndex = 0; pokeIndex < pokemon1.length; pokeIndex++) {
    pokedexTargetRef.innerHTML += getCardTemplate(pokeIndex);
    document.getElementById(`pokeName(${pokeIndex})`).innerHTML =
      pokemon1[pokeIndex].name;
    document.getElementById(`pokeId(${pokeIndex})`).innerHTML =
      pokemon1[pokeIndex].index;
    renderEachCardType(pokeIndex);
  }
}

function getCardTemplate(pokeIndex) {
  return /*html*/ `
    <p id="pokeName(${pokeIndex})"></p>
    <p id="pokeId(${pokeIndex})"></p>
    <p id="pokeType(${pokeIndex})"></p>
    <img id="pokeSprite(${pokeIndex})" src=""></img>
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
