//#region ARRAYS
let pokemonAll = [];
let currentPkmns = [];
//#endregion
//#region GLOBALS
const maxPkmnId = 493;
let offset = 387;
const renderedAmount = 30;
const limit = 493;

//#endregion
function init() {
  fetchPokeData();
  currentPkmns = pokemonAll;
}

async function fetchPokeData() {
  openLoadingscreen(); 
  await fetchData();
  closeLoadingscreen();
}

async function fetchData(){
   const newOffset = offset + renderedAmount;
    for (let i = offset; i < newOffset; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const eachPokeData = await response.json();
    if (eachPokeData.id <= maxPkmnId) {
      pushPokemonIntoArray(eachPokeData);
      renderEachCard(pokemonAll, i - 387);
      offset++;
    }
  }

  if (offset >= limit) {
    document.getElementById("loadingBtn").classList.add("display-none");
  }
}

function pushPokemonIntoArray(eachPokeData) {
  if (offset <= limit) {
    currentPkmns.push({
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
}

function getPokeInfo(arr, pokeIndex) {
  document.getElementById(`pokeName(${pokeIndex})`).innerHTML = arr[pokeIndex].name.charAt(0).toUpperCase() + arr[pokeIndex].name.substr(1);
  document.getElementById(`pokeId(${pokeIndex})`).innerHTML = arr[pokeIndex].index;
}

function renderEachCard(arr, pokeIndex) {
  const pokedexTargetRef = document.getElementById("pokemonCardsTarget");
  pokedexTargetRef.innerHTML += getCardTemplate(pokeIndex);
  getPokeInfo(arr, pokeIndex);
  renderEachCardType(arr, pokeIndex);
}

function renderEachCardType(arr, pokeIndex) {
  let typeTemplate = document.getElementById(`pokeType(${pokeIndex})`);
  for (let j = 0; j < arr[pokeIndex].type.length; j++) {
    typeTemplate.innerHTML += getTypeTemplate(arr[pokeIndex].type[j].type);
  }
  document.getElementById(`pokeSprite(${pokeIndex})`).setAttribute("src", arr[pokeIndex].sprite);
}

//#region modal
function getPokeModalInfo(pokeIndex) {
  document.getElementById(`pokeModalName(${pokeIndex})`).innerHTML = currentPkmns[pokeIndex].name.charAt(0).toUpperCase() + currentPkmns[pokeIndex].name.substr(1);
  document.getElementById(`pokeModalId(${pokeIndex})`).innerHTML = currentPkmns[pokeIndex].index;
  let typeTemplate = document.getElementById(`pokeModalType(${pokeIndex})`);
  for (let j = 0; j < pokemonAll[pokeIndex].type.length; j++) {
    typeTemplate.innerHTML += getTypeTemplate(pokemonAll[pokeIndex].type[j].type);
  }
  document.getElementById(`pokeModalSprite(${pokeIndex})`).setAttribute("src", currentPkmns[pokeIndex].sprite);
}

function renderModal(pokeIndex) {
  renderStatInfo(pokeIndex);
  renderShiny(pokeIndex);
  renderAboutSection(pokeIndex);
  let modalBasicInfoRef = document.getElementById(`basicInfo(${pokeIndex})`);
  modalBasicInfoRef = getPokeModalInfo(pokeIndex);
}

function renderStatInfo(pokeIndex) {
  const pokeStats = currentPkmns[pokeIndex].stats;
  document.getElementById(`hp(${pokeIndex})`).innerHTML = pokeStats[0].base_stat;
  document.getElementById(`attack(${pokeIndex})`).innerHTML = pokeStats[1].base_stat;
  document.getElementById(`defense(${pokeIndex})`).innerHTML = pokeStats[2].base_stat;
  document.getElementById(`spAttack(${pokeIndex})`).innerHTML = pokeStats[3].base_stat;
  document.getElementById(`spDefense(${pokeIndex})`).innerHTML = pokeStats[4].base_stat;
  document.getElementById(`speed(${pokeIndex})`).innerHTML = pokeStats[5].base_stat;
}

function renderShiny(pokeIndex) {
  document.getElementById(`pokeShiny(${pokeIndex})`).setAttribute("src", currentPkmns[pokeIndex].shiny);
}

function renderAboutSection(pokeIndex) {
  document.getElementById(`height(${pokeIndex})`).innerHTML = currentPkmns[pokeIndex].height;
  document.getElementById(`weight(${pokeIndex})`).innerHTML = currentPkmns[pokeIndex].weight;
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

function bubblingPrevention(event) {
  event.stopPropagation();
}

function closeDialog() {
  const dialogRef = document.getElementById(`singleModal`);
  dialogRef.close();
  document.body.classList.remove("noscroll");
}
//#endregion

//#region filter
function searchInputValue() {
  const soughtPkmn = document.getElementById("searchBar").value;
  if (soughtPkmn.length >= 3) {
    filterThroughCurrentPkmn(soughtPkmn);
  } else {
    const feedbackRef = document.getElementById("searchFeedback");
    feedbackRef.innerHTML = "please use at least 3 characters";
     const contentRef = document.getElementById("pokemonCardsTarget");
    contentRef.innerHTML = "";
  }
  document.getElementById("loadingBtn").classList.add("display-none");
}

function filterThroughCurrentPkmn(filterPkmn) {
  const feedbackRef = document.getElementById("searchFeedback");
  currentPkmns = pokemonAll.filter((element) =>
    element.name.includes(filterPkmn.toLowerCase())
  );  
  if (currentPkmns.length === 0) {
    feedbackRef.innerHTML = "no matches found";
    const contentRef = document.getElementById("pokemonCardsTarget");
    contentRef.innerHTML = "";
  } else {
    console.log(currentPkmns);
    const contentRef = document.getElementById("pokemonCardsTarget");
    feedbackRef.innerHTML = "";
    contentRef.innerHTML = "";
    renderCurrentPkms();
  }
}

function renderCurrentPkms() {
  for (let index = 0; index < currentPkmns.length; index++) {
    renderEachCard(currentPkmns, index);
  }
}
//#endregion

//#region arrows
function goForth(pokeIndex) {
  let modal = document.getElementById(`singleModal`);
  if (pokeIndex - 1 < 0) {
    modal.innerHTML = "";
    pokeIndex = currentPkmns.length - 1;
    modal.innerHTML = getModalTemplate(pokeIndex);
  } else {
    modal.innerHTML = "";
    pokeIndex--;
    modal.innerHTML = getModalTemplate(pokeIndex);
  }
  renderModal(pokeIndex);
}

function goBack(pokeIndex) {
  let modal = document.getElementById(`singleModal`);
  if (pokeIndex + 1 >= currentPkmns.length) {
    pokeIndex = currentPkmns.length - pokeIndex - 1;
    modal.innerHTML = "";
    modal.innerHTML = getModalTemplate(pokeIndex);
  } else {
    modal.innerHTML = "";
    pokeIndex++;
    modal.innerHTML = getModalTemplate(pokeIndex);
  }
  renderModal(pokeIndex);
}
//#endregion

//#region loadingsreen
function openLoadingscreen() {
  const loadingscreenRef = document.getElementById("loadingDialog");
  loadingscreenRef.classList.add("loading-overlay");
  loadingscreenRef.showModal();
}

function closeLoadingscreen() {
  const loadingscreenRef = document.getElementById("loadingDialog");
  loadingscreenRef.classList.remove("loading-overlay");
  loadingscreenRef.close();
}
//#endregion
