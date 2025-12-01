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
  return `<div id="eachModal(${pokeIndex})" class="">
            <section class="modal-basic" id="basicInfo(${pokeIndex})">
            <section class="modal-main">
          <header class="single-card-header">
            <div># <span id="pokeModalId(${pokeIndex})"></span></div>
          </header>    
            <span class="poke-name"  id="pokeModalName(${pokeIndex})"></span>
            <img class="poke-sprite" id="pokeModalSprite(${pokeIndex})" src=""></img>    
            <p id="pokeModalType(${pokeIndex})"></p>
            </section>

           <section class="modal-info" id="modalInfo">
          <header class="modal-header">
            <a class="underline" id="aboutRef" onclick="toggleAbout()" href="#">About</a>
            <a id="statRef" onclick="toggleStats()" href="#">Base Stats</a>
            <a id="shinyRef" onclick="toggleShiny()" href="#">Shiny</a>
          </header>

          <div class="modal-info-inner-layout" > 
              <div id="aboutSection" class="display-toggle display-toggle-on ">
                <p><span>Height</span><span id="height(${pokeIndex})"></span></p>
                <p><span>Weight</span><span id="weight(${pokeIndex})"></span></p>
              </div>

              <div id="statSection" class="display-toggle">
                <p><span>HP</span><span id="hp(${pokeIndex})"></span></p>
                <p><span>Attack</span><span id="attack(${pokeIndex})"></span></p>
                <p><span>Defense</span><span id="defense(${pokeIndex})"></span></p>
                <p><span>Special Attack</span><span id="spAttack(${pokeIndex})"></span></p>
                <p><span>Special Defense</span><span id="spDefense(${pokeIndex})"></span></p>
                <p><span>Speed</span><span id="speed(${pokeIndex})"></span></p>
              </div>

              <div id="shinySection" class="display-toggle">
                <img class="poke-shiny" id="pokeShiny(${pokeIndex})" src=""></img>
              </div>
              </div>
             </section>

      </section>
      </div>`;
}
