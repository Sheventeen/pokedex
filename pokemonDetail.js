document.addEventListener('DOMContentLoaded', async() => {
    const pokemonName = new URLSearchParams(window.location.search).get('name');
    const pokemonId = new URLSearchParams(window.location.search).get('id');
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const descUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
    const data = fetch
    if (pokemonName) {
        // Simulate fetching Pokémon details
        document.getElementById("pokemonName").textContent = pokemonName.toUpperCase();
        document.getElementById("pokemonImage").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        const type = await getType();
        const desc = await getDesc();
        const color = await getColor();
        document.getElementById("type").textContent = `Type: ${type.toUpperCase()}`;
        document.getElementById("desc").textContent = `${desc}`;

        document.getElementById("pokemonDisplay").style.backgroundColor = color;
    }

    // document.getElementById("backButton").addEventListener("click", () => {
    //     window.history.back();
    // });
    async function getType(){
        let response = await fetch(url);
        if(!response.ok) throw new Error("Not valid");
        let pokemon = await response.json();
        const types = pokemon.types.map(typeInfo => typeInfo.type.name);
        return types.join(", ");
    }
    async function getDesc(){
        let response = await fetch(descUrl);
        if(!response.ok) throw new Error("Not valid");
        let pokemon = await response.json();
        const desc = pokemon.flavor_text_entries.find(entry => entry.language.name ==="en");
        console.log(desc);
        let text = desc.flavor_text.replace(/\n|\f/g, ' ');
        return text;
    }
    async function getColor(){
        let response = await fetch(descUrl);
        if(!response.ok) throw new Error("Not valid");
        let pokemon = await response.json();
        const color = pokemon.color.name;
        return color;
    }
});