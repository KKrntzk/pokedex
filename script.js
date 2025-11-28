let pokemonAll = [];

function init() {
  fetchPokeData();
  console.log(pokemonAll);
}

async function fetchPokeData() {
  for (let i = 0; i < 40; i++) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${i + 387}`
    );
    const eachPokeData = await response.json();
    pushPokemonIntoArray(eachPokeData);
  }
  renderEachCard();
}

function pushPokemonIntoArray(eachPokeData) {
  pokemonAll.push({
    name: eachPokeData.name,
    index: eachPokeData.id,
    type: eachPokeData.types,
    sprite: eachPokeData.sprites.front_default,
    stats: eachPokeData.stats,
  });
}

function renderEachCard() {
  const pokedexTargetRef = document.getElementById("pokemonCardsTarget");
  for (let pokeIndex = 0; pokeIndex < pokemonAll.length; pokeIndex++) {
    pokedexTargetRef.innerHTML += getCardTemplate(pokeIndex);
    document.getElementById(`pokeName(${pokeIndex})`).innerHTML =
      pokemonAll[pokeIndex].name.charAt(0).toUpperCase() +
      pokemonAll[pokeIndex].name.substr(1);
    document.getElementById(`pokeId(${pokeIndex})`).innerHTML =
      pokemonAll[pokeIndex].index;
    renderEachCardType(pokeIndex);
  }
}

function renderEachCardType(pokeIndex) {
  let typeTemplate = document.getElementById(`pokeType(${pokeIndex})`);
  for (let j = 0; j < pokemonAll[pokeIndex].type.length; j++) {
    typeTemplate.innerHTML += getTypeTemplate(
      pokemonAll[pokeIndex].type[j].type
    );
    document
      .getElementById(`singleCard(${pokeIndex})`)
      .classList.add(`type-${pokemonAll[pokeIndex].type[j].type.name}`);
  }
  document
    .getElementById(`pokeSprite(${pokeIndex})`)
    .setAttribute("src", pokemonAll[pokeIndex].sprite);
}
