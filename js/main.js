const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-img')
const form = document.querySelector('.form');
const input = document.querySelector('.input-search')

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    
    if (APIResponse === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    // pokemonName.innerHTML = 'Loading...'

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    } else{
        pokemonName.innerHTML = 'Not found :c'
        pokemonNumber.innerHTML = ''
    }
   
}

form.addEventListener('submit', () => {
    event.preventDefault();
    renderPokemon(input.value);
    input.value = ''
})