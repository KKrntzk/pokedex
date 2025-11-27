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

    renderCard(i);
  }
}

function renderCard(i) {
  document.getElementById("pokeName").innerHTML += pokemon1[i].name;
  document.getElementById("pokeId").innerHTML += pokemon1[i].index;
  let typeTemplate = "";
  for (let j = 0; j < pokemon1[i].type.length; j++) {
    typeTemplate += getTypeTemplate(
      pokemon1[i].type[j].type,
      pokemon1[i].index
    );
  }
  document.getElementById("pokeType").innerHTML += typeTemplate;
  document.getElementById("pokeSprite").setAttribute("src", pokemon1[i].sprite);
}

function getTypeTemplate(type, index) {
  return /*html*/ `
        <p>${index} ${type.name}</p>
    `;
}
