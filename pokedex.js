// gathering html element ids to work with and dynamically update as we nativate the program
const pokedex = document.getElementById("pokedex");
const display = document.getElementById("displayContainer");
document.getElementById("searchButton").addEventListener("click", searchPokemon);
document.getElementById("randomButton").addEventListener("click",randomPokemon);
document.getElementById("searchBox").addEventListener("keydown", function(event){
    if(event.key === "Enter")searchPokemon(); 
});

const pokeArr = [];
const promiseArr = [];

document.addEventListener('DOMContentLoaded', async()=>{
    
    for (let pokemonId =1; pokemonId<152;pokemonId++){
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
        promiseArr.push(fetch(url).then(res => {
            if(!res.ok) throw new Error("Error occured when trying to fetch pokemons api");
            return res.json();
        }));
    }
        try{
           const pokeData = await Promise.all(promiseArr);
            
           pokeData.forEach((pokemon, index) => {
            const pokemonId = index + 1;
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
            newElement.addEventListener("click",onClick);

            pokedex.appendChild(newElement); 
           });
           console.log(pokeArr);
            const now = new Date();
            const currentDateTime = now.toLocaleString();
            console.log(currentDateTime);
        }
        catch(error){
            console.error("failed",error);
            }
        });

function onClick(event){
    const itemName = event.currentTarget.name;
    const itemUrl = event.currentTarget.getAttribute("data-url");
    const itemId = event.currentTarget.id;
    displayPokemon(itemName,itemId);
}

function displayPokemon(pokemon, pokemonId){
    const url = `displayPokemon.html?name=${encodeURIComponent(pokemon)}&id=${encodeURIComponent(pokemonId)}`;
    window.location.href = url;
}
function searchPokemon(){
    const input = document.getElementById("searchBox").value.toLowerCase().trim();
    const pokemonItem = document.getElementsByTagName("li");

    for(let i=0;i < pokemonItem.length;i++){
        const currPokemon = pokemonItem[i].name.toLowerCase();

        if(currPokemon.includes(input))
            pokemonItem[i].style.display = "";
        else pokemonItem[i].style.display = "none";
    }
}
function randomPokemon(){
    const max = document.getElementsByTagName("li").length;
    const id = Math.floor(Math.random() * (max) + 1);
    const pokemon = pokeArr[id-1].name;
    displayPokemon(pokemon,id);
}