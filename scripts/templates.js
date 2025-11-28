function getCardTemplate(pokeIndex) {
  return /*html*/ `
    <div id="singleCard(${pokeIndex})" class="single-cards">   
    <header class="single-card-header"><div># <span id="pokeId(${pokeIndex})"></span></div></header>    
    <span class="poke-name"  id="pokeName(${pokeIndex})"></span>
    <img class="poke-sprite" id="pokeSprite(${pokeIndex})" src=""></img>    
    <p id="pokeType(${pokeIndex})"></p>
    </div>
    `;
}

function getTypeTemplate(type) {
  return /*html*/ `
        <p class="poke-type">${type.name}</p>
    `;
}
