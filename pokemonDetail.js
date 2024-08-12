document.addEventListener('DOMContentLoaded', () => {
    const pokemonName = new URLSearchParams(window.location.search).get('name');
    const pokemonId = new URLSearchParams(window.location.search).get('id');

    if (pokemonName) {
        // Simulate fetching Pokémon details
        document.getElementById("pokemonName").textContent = pokemonName;
        document.getElementById("pokemonImage").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    }

    document.getElementById("backButton").addEventListener("click", () => {
        window.history.back();
    });
});