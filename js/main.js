const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-img');
const form = document.querySelector('.form');;
const input = document.querySelector('.input-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let pokemonSearch = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    
     pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonSearch = data.id;
    } 
    else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
   
}

form.addEventListener('submit', () => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = ''
})

btnPrev.addEventListener('click', () => {
    if   (pokemonSearch > 1){
        pokemonSearch -= 1;
        renderPokemon(pokemonSearch);
    }
})

btnNext.addEventListener('click', () => {
    pokemonSearch += 1;
    renderPokemon(pokemonSearch);
})

renderPokemon(pokemonSearch);