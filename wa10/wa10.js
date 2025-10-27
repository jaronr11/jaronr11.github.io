let pokeBtn = document.querySelector("#js-new-poke-name").addEventListener('click', newPokemon);
let pokeSoundBtn = document.querySelector("#js-new-poke-sound").addEventListener('click', playPokemonSound);
let current = {
    name: "",
    cry: "",
    sprite: "",
}
function generateRandomEndpoint() {
    min = Math.ceil(1);
    max = Math.floor(1025);
    rn =  Math.floor(Math.random() * (max - min)) + min;
    return `https://pokeapi.co/api/v2/pokemon/${rn}`;
}
async function newPokemon () {
    try {
        const endpoint = generateRandomEndpoint();

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        const sprites = json['sprites'];
        const cries = json['cries'];
        displayPokemon(json['name'], sprites['front_default'], cries['latest']);
        current.name = json['name'];
        current.cry = cries['latest'];
        current.sprite = sprites['front_default']
    }
    catch(err) {
        console.log(err);
        alert("Failed to get new pokemon");
    }
}

function displayPokemon(name, sprite) {
    const pokemonName = document.querySelector("#js-poke-name");
    const pokemonSprite = document.querySelector("#js-poke-sprite");

    pokemonName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    pokemonSprite.src = sprite;
    pokemonSprite.hidden=false;
}

function playPokemonSound() {
    const pokemonCry = document.querySelector('#js-poke-sound');
    pokemonCry.src = current.cry;
    pokemonCry.play();
}


