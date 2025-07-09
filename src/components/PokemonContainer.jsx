import { useState } from "react"

const pokemon_container = ({ addHistory, addBanned, banned }) => {
  const [sprite, setSprite] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png")
  const [name, setName] = useState("")

  const getPokemonData = async() => {
    try {
      let isBanned
      let pokemonData
      let speciesData
      let attributes
      
      do {
        attributes = []
        isBanned = false
        const id = Math.floor(Math.random() * 1025) + 1;
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        pokemonData = await pokemonResponse.json()
        const speciesResponse = await fetch(pokemonData.species.url)
        speciesData = await speciesResponse.json()
        const types = pokemonData.types
        types.forEach(type => {
          attributes.push(type.type.name)
        })
        attributes.push(speciesData.color.name)
        attributes.push(speciesData.generation.name)

        attributes.forEach(attribute => {
          if(banned.includes(attribute)) {isBanned = true}
        })
      } while (isBanned)

      setSprite(pokemonData.sprites.front_default)
      setName(pokemonData.name)
      mapAttributes(attributes)

      const pokemon = {
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default,
        attributes: attributes
      }

      addHistory(pokemon)
      

    } catch(error) {
      console.log(error)
    }
  }

  const mapAttributes = (attributes) => {
    const att_container = document.getElementById("attributes_container")
    att_container.innerHTML = ""
    attributes.forEach(attribute => {
    const att = document.createElement("h2")
    att.innerHTML = attribute
    att.classList.add("attribute", attribute)
    att.onclick = () => addBanned(attribute)
    if (CSS.supports("color", attribute)) {att.style.backgroundColor = attribute}
    att_container.appendChild(att)
    })
  }

    return (
    <div className='pokemon_container'>
        <h1>Pokedex</h1>
        <h3>Discover what kinds of Pokemon you will find on tall grass!</h3>
        <h2>{name}</h2>
        <h2 id="attributes_title">Attributes</h2>
        <div id='attributes_container'>
        </div>
        <img id='sprite' src={sprite} alt="pokemon sprite"></img>
        <button id="shuffle_button" onClick={getPokemonData}>
          <img src="https://archives.bulbagarden.net/media/upload/0/03/BW_Grass_Sp.png" alt="tall_grass" style={{ marginRight: "5px" }}></img>
          Venture into the tall Grass!  
          <img src="https://archives.bulbagarden.net/media/upload/0/03/BW_Grass_Sp.png" alt="tall_grass" style={{ marginLeft: "5px" }}></img>
          </button>
    </div>      
)}
export default pokemon_container