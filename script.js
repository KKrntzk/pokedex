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
    shiny: eachPokeData.sprites.front_shiny,
    height: eachPokeData.height,
    weight: eachPokeData.weight,
    abilities: eachPokeData.abilities,
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

function renderModal(pokeIndex) {
  document.getElementById(`singleCard(${pokeIndex})`);
  renderStatInfo(pokeIndex);
  renderShiny(pokeIndex);
  renderAboutSection(pokeIndex);
  // renderAbilities(pokeIndex);
}

function renderStatInfo(pokeIndex) {
  const pokeStats = pokemonAll[pokeIndex].stats;
  document.getElementById(`hp(${pokeIndex})`).innerHTML =
    pokeStats[0].base_stat;
  document.getElementById(`attack(${pokeIndex})`).innerHTML =
    pokeStats[1].base_stat;
  document.getElementById(`defense(${pokeIndex})`).innerHTML =
    pokeStats[2].base_stat;
  document.getElementById(`spAttack(${pokeIndex})`).innerHTML =
    pokeStats[3].base_stat;
  document.getElementById(`spDefense(${pokeIndex})`).innerHTML =
    pokeStats[4].base_stat;
  document.getElementById(`speed(${pokeIndex})`).innerHTML =
    pokeStats[5].base_stat;
}

function renderShiny(pokeIndex) {
  document
    .getElementById(`pokeShiny(${pokeIndex})`)
    .setAttribute("src", pokemonAll[pokeIndex].shiny);
}

function renderAboutSection(pokeIndex) {
  document.getElementById(`height(${pokeIndex})`).innerHTML =
    pokemonAll[pokeIndex].height;
  document.getElementById(`weight(${pokeIndex})`).innerHTML =
    pokemonAll[pokeIndex].weight;
}

function renderAbilities(pokeIndex) {
  for (let k = 0; k < array.length; k++) {
    document.getElementById(`abilities(${pokeIndex})`).innerHTML +=
      pokemonAll[pokeindex].abilities[k].ability.name;
  }
}

function openDialog(pokeIndex) {
  const dialogRef = document.getElementById(`singleModal`);
  dialogRef.innerHTML = getModalTemplate(pokeIndex);
  renderModal(pokeIndex);
  dialogRef.showModal(pokeIndex);
  document.body.classList.add("noscroll");
}
