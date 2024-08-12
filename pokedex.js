const pokedex = document.getElementById("pokedex");
const display = document.getElementById("displayContainer");

document.addEventListener('DOMContentLoaded', async()=>{
    const pokeArr = [];

    for (let pokemonId =1; pokemonId<152;pokemonId++){
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

        await fetch(url)
        .then(resp=>{
            if(!resp.ok) throw new Error("Not a valid response");
            return resp.json();
        })
        .then(pokemon=>{
            const pokeObj = {
                url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
                name: pokemon.name,
                id: pokemonId,
                image: pokemon.sprites.front_default
            }; 
            pokeArr.push(pokeObj);

            const newElement = document.createElement("li");
            const pokemonImage = document.createElement("img");

            pokemonImage.src = pokeObj.image;
            pokemonImage.alt = pokeObj.name;
        
            newElement.name = pokeObj.name;
            newElement.id = pokeObj.id;
            newElement.textContent = pokeObj.name;
            newElement.appendChild(pokemonImage);
            newElement.setAttribute("data-url", pokeObj.url);

            pokedex.appendChild(newElement);

            newElement.addEventListener("click",onClick);
            
        })};
        console.log(pokeArr);
        function onClick(event){
            const itemName = event.currentTarget.name;
            const itemUrl = event.currentTarget.getAttribute("data-url");
            const itemId = event.currentTarget.id;
            displayPokemon(itemName,itemId);
        }
 
});

function displayPokemon(pokemon, pokemonId){
    const url = `displayPokemon.html?name=${encodeURIComponent(pokemon)}&id=${encodeURIComponent(pokemonId)}`;
    window.location.href = url;
}


