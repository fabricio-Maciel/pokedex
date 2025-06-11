const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151;
let offset = 0;
const limit = 5;
const closeModal = document.getElementById("close-modal");

let allLoadedPokemons = [];

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    allLoadedPokemons = [...allLoadedPokemons, ...pokemons];
    const newHtml = pokemons
      .map(
        (pokemon, index) => `<li class="pokemon ${pokemon.type}" data-index="${
          offset + index
        }"> 
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join(" ")}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
      </li>`
      )
      .join(" ");
    pokemonList.innerHTML += newHtml;

    const pokemonItems = document.querySelectorAll(".pokemon");
    pokemonItems.forEach((item) => {
      item.addEventListener("click", () => {
        const index = item.getAttribute("data-index");
        const pokemonClick = allLoadedPokemons[index];
        openModal(pokemonClick);
        console.log("clickou");
        console.log(pokemonClick);
      });
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

// Modal

function openModal(pokemonTargetClick) {
  const modal = document.getElementById("modal-id");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `
      <div class="header-modal">
        <div class="infos-modal">
          <span class="name-modal">${pokemonTargetClick.name}</span>
          <ol class="types-modal">
            ${pokemonTargetClick.types
              .map((type) => `<li class="type-modal ${type}">${type}</li>`)
              .join(" ")}
          </ol>
        </div>
        <span class="number-modal">#${pokemonTargetClick.number}</span>
      </div>
      <img src="${pokemonTargetClick.photo}" alt="${pokemonTargetClick.name}">
  `;

  modal.className = "modal";
  modal.classList.add(pokemonTargetClick.type);
}

closeModal.addEventListener("click", () => {
  document.getElementById("modal-id").classList.add("hidden");
});
