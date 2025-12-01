let pokemonAll = [];

function init() {
  fetchPokeData();
  console.log(pokemonAll);
}

let offset = 387;
const renderedAmount = 30;
const limit = 494;

async function fetchPokeData() {
  if (pokemonAll.length >= 107) {
    console.log("limit erreicht");
    return;
  } else {
    for (let i = offset; i < offset + renderedAmount; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const eachPokeData = await response.json();
      pushPokemonIntoArray(eachPokeData);
      renderEachCard(pokemonAll.length - 1);
    }
    offset += renderedAmount;
  }
}

// pokemonAll.forEach()

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

function getPokeInfo(pokeIndex) {
  document.getElementById(`pokeName(${pokeIndex})`).innerHTML =
    pokemonAll[pokeIndex].name.charAt(0).toUpperCase() +
    pokemonAll[pokeIndex].name.substr(1);
  document.getElementById(`pokeId(${pokeIndex})`).innerHTML =
    pokemonAll[pokeIndex].index;
}

function renderEachCard(pokeIndex) {
  const pokedexTargetRef = document.getElementById("pokemonCardsTarget");
  pokedexTargetRef.innerHTML += getCardTemplate(pokeIndex);
  getPokeInfo(pokeIndex);
  renderEachCardType(pokeIndex);
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
//#region modal
function getPokeModalInfo(pokeIndex) {
  document.getElementById(`pokeModalName(${pokeIndex})`).innerHTML =
    pokemonAll[pokeIndex].name.charAt(0).toUpperCase() +
    pokemonAll[pokeIndex].name.substr(1);
  document.getElementById(`pokeModalId(${pokeIndex})`).innerHTML =
    pokemonAll[pokeIndex].index;
  let typeTemplate = document.getElementById(`pokeModalType(${pokeIndex})`);
  for (let j = 0; j < pokemonAll[pokeIndex].type.length; j++) {
    typeTemplate.innerHTML += getTypeTemplate(
      pokemonAll[pokeIndex].type[j].type
    );
    document
      .getElementById(`eachModal(${pokeIndex})`)
      .classList.add(`type-${pokemonAll[pokeIndex].type[j].type.name}`);
  }
  document
    .getElementById(`pokeModalSprite(${pokeIndex})`)
    .setAttribute("src", pokemonAll[pokeIndex].sprite);
}

function renderModal(pokeIndex) {
  document.getElementById(`singleCard(${pokeIndex})`);
  renderStatInfo(pokeIndex);
  renderShiny(pokeIndex);
  renderAboutSection(pokeIndex);
  let modalBasicInfoRef = document.getElementById(`basicInfo(${pokeIndex})`);
  modalBasicInfoRef = getPokeModalInfo(pokeIndex);
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

function toggleShiny() {
  document.getElementById("shinyRef").classList.add("underline");
  document.getElementById("aboutRef").classList.remove("underline");
  document.getElementById("statRef").classList.remove("underline");
  const statSectionRef = document.getElementById("statSection");
  statSectionRef.classList.remove("display-toggle-on");
  const aboutSectionRef = document.getElementById("aboutSection");
  aboutSectionRef.classList.remove("display-toggle-on");
  const shinySectionRef = document.getElementById("shinySection");
  shinySectionRef.classList.add("display-toggle-on");
}

function toggleAbout() {
  document.getElementById("shinyRef").classList.remove("underline");
  document.getElementById("aboutRef").classList.add("underline");
  document.getElementById("statRef").classList.remove("underline");
  const statSectionRef = document.getElementById("statSection");
  statSectionRef.classList.remove("display-toggle-on");
  const aboutSectionRef = document.getElementById("aboutSection");
  aboutSectionRef.classList.add("display-toggle-on");
  const shinySectionRef = document.getElementById("shinySection");
  shinySectionRef.classList.remove("display-toggle-on");
}

function toggleStats() {
  document.getElementById("shinyRef").classList.remove("underline");
  document.getElementById("aboutRef").classList.remove("underline");
  document.getElementById("statRef").classList.add("underline");
  const statSectionRef = document.getElementById("statSection");
  statSectionRef.classList.add("display-toggle-on");
  const aboutSectionRef = document.getElementById("aboutSection");
  aboutSectionRef.classList.remove("display-toggle-on");
  const shinySectionRef = document.getElementById("shinySection");
  shinySectionRef.classList.remove("display-toggle-on");
}
//#endregion
//#region dialog
function openDialog(pokeIndex) {
  const dialogRef = document.getElementById(`singleModal`);
  dialogRef.innerHTML = getModalTemplate(pokeIndex);
  renderModal(pokeIndex);
  dialogRef.showModal(pokeIndex);
  document.body.classList.add("noscroll");
}

function closeDialog() {
  const dialogRef = document.getElementById(`singleModal`);
  dialogRef.close();
  // dialogRef.addEventListener("click", (event) => {
  //   console.log(event.target);

  //   // if (event.target == dialogRef) {
  //   //   dialogRef.closest();
  //   // }
  // });
}
//#endregion
