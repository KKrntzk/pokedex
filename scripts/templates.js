function getCardTemplate(pokeIndex) {
  return /*html*/ `
    <div onclick="openDialog(${pokeIndex})" id="singleCard(${pokeIndex})" class="single-cards">   
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

function getModalTemplate(pokeIndex) {
  return `<div class="modal">
            <section class="modal-basic" id="basicInfo(${pokeIndex})">
          <header class="single-card-header">
            <div># <span id="pokeModalId(${pokeIndex})"></span></div>
          </header>    
            <span class="poke-name"  id="pokeModalName(${pokeIndex})"></span>
            <img class="poke-sprite" id="pokeModalSprite(${pokeIndex})" src=""></img>    
            <p id="pokeModalType(${pokeIndex})"></p>

           <section class="modal-info" id="modalInfo">
          <header class="modal-header">
            <a href="#">About</a>
            <a href="#">Base Stats</a>
            <a href="#">Shiny</a>
          </header>
              <div id="aboutSection">
                <p><span>Height</span><span id="height(${pokeIndex})"></span></p>
                <p><span>Weight</span><span id="weight(${pokeIndex})"></span></p>
              </div>

              <div id="statSection">
                <p><span>HP</span><span id="hp(${pokeIndex})"></span></p>
                <p><span>Attack</span><span id="attack(${pokeIndex})"></span></p>
                <p><span>Defense</span><span id="defense(${pokeIndex})"></span></p>
                <p><span>Special Attack</span><span id="spAttack(${pokeIndex})"></span></p>
                <p><span>Special Defense</span><span id="spDefense(${pokeIndex})"></span></p>
                <p><span>Speed</span><span id="speed(${pokeIndex})"></span></p>
              </div>

              <div id="shinySection">
                <img class="poke-shiny" id="pokeShiny(${pokeIndex})" src=""></img>
              </div>
             </section>

      </section>
      </div>`;
}
