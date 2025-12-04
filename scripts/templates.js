function getCardTemplate(pokeIndex) {
  return /*html*/ `
    <div onclick="bubblingPrevention(event), openDialog(${pokeIndex})" id="singleCard(${pokeIndex})" class="single-cards" >
      <header class="single-card-header">
        <div># <span id="pokeId(${pokeIndex})"></span></div>
      </header>
      
      <span class="poke-name" id="pokeName(${pokeIndex})"></span>
      
      <img class="poke-sprite" id="pokeSprite(${pokeIndex})" src="" alt="Pokemon Sprite"/>
      
      <div id="pokeType(${pokeIndex})" class="type-container"></div>
    </div>
  `;
}

function getTypeTemplate(type) {
  return /*html*/ `
    <p class="poke-type type-${type.name}">${type.name}</p>
  `;
}

function getModalTemplate(pokeIndex) {
  return /*html*/ `
    <div onclick="bubblingPrevention(event)" id="eachModal(${pokeIndex})">
      <section class="modal-basic" id="basicInfo(${pokeIndex})">
        
        <section class="modal-main">
          <header class="modal-single-card-header">
            <div># <span id="pokeModalId(${pokeIndex})"></span></div>
          </header>    

          <div class="outer-shell">
            <div>
              <span class="modal-poke-name" id="pokeModalName(${pokeIndex})"></span>            
              <div id="pokeModalType(${pokeIndex})" class="modal-type-container"></div>
            </div>

            <div> 
              <img class="modal-poke-sprite" id="pokeModalSprite(${pokeIndex})" src="" alt="Pokemon Sprite"/> 
            </div>  
          </div> 
        </section>

        <section class="modal-info" id="modalInfo">
          <header class="modal-header">
            <a class="underline" id="aboutRef" onclick="bubblingPrevention(event), toggleAbout()" href="#">About</a>
            <a id="statRef" onclick="bubblingPrevention(event), toggleStats()" href="#">Base Stats</a>
            <a id="shinyRef" onclick="bubblingPrevention(event), toggleShiny()" href="#">Shiny</a>
          </header>

          <div class="modal-info-inner-layout"> 
            <div id="aboutSection" class="modal-stats-inner display-toggle display-toggle-on">
              <p><span><strong>Height:</strong></span><span id="height(${pokeIndex})"></span> cm</p>
              <p><span><strong>Weight:</strong></span><span id="weight(${pokeIndex})"></span> g</p>
            </div>

            <div id="statSection" class="modal-stats-inner display-toggle">
              <p><span><strong>HP:</strong></span><span id="hp(${pokeIndex})"></span></p>
              <p><span><strong>Attack:</strong></span><span id="attack(${pokeIndex})"></span></p>
              <p><span><strong>Defense:</strong> </span><span id="defense(${pokeIndex})"></span></p>
              <p><span><strong>Special Attack:</strong> </span><span id="spAttack(${pokeIndex})"></span></p>
              <p><span><strong>Special Defense:</strong></span><span id="spDefense(${pokeIndex})"></span></p>
              <p><span><strong>Speed:</strong> </span><span id="speed(${pokeIndex})"></span></p>
            </div>

            <div id="shinySection" class="display-toggle">
              <img class="modal-poke-shiny" id="pokeShiny(${pokeIndex})" src="" alt="Shiny Pokemon"/>
            </div>
          </div>

          <footer class="footer-modal">
            <button id="modalBtnL" class="modal-left-btn" onclick="bubblingPrevention(event), goForth(${pokeIndex})"></button>
            <button id="modalBtnR" class="modal-right-btn" onclick="bubblingPrevention(event), goBack(${pokeIndex})"></button>
          </footer>
        </section>

      </section>
    </div>
  `;
}
