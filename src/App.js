import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from './PokemonCard';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Step 1: Fetch a list of Pokemon (names and URLs)
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');

        // Step 2: Fetch details of each Pokemon using their URLs
        const promises = response.data.results.map((pokemon) => axios.get(pokemon.url));
        const allPokemons = await Promise.all(promises);

        // Step 3: Map the detailed Pokemon data to state
        const pokemonData = allPokemons.map(pokemon => pokemon.data);
        
        
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemons();
  }, []);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 

  return (
    <div className="app">
      <h1>Pokemon List</h1>
      <input 
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="pokemon-list">
        {filteredPokemonList.length > 0 ? (
          filteredPokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p>No Pokemon found!</p>
        )}
      </div>
    </div>
  );
}

export default App;
