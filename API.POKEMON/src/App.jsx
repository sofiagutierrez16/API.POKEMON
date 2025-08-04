// src/App.js
import React, { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para buscar Pokémon en API
  const fetchPokemons = async (query) => {
    setLoading(true);
    setError(null);
    try {
      if (query.trim() === '') {
        // cargar primeros 10 Pokémon si está vacío
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await res.json();
        const detailedPokemons = await Promise.all(
          data.results.map((p) => fetch(p.url).then((res) => res.json()))
        );
        setPokemonList(detailedPokemons);
      } else {
        // buscar Pokémon por nombre
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (!res.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const data = await res.json();
        setPokemonList([data]); // solo uno
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  };

  // Detectar cambios en searchTerm y hacer la llamada a la API
  useEffect(() => {
    fetchPokemons(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Pokémon</h1>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{ padding: '8px', width: '200px', marginBottom: '20px' }}
      />
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.front_default}
              characteristics={[
                `ID: ${pokemon.id}`,
                `Type: ${pokemon.types[0].type.name}`,
              ]}
            />
          ))
        ) : (
          !loading && <p>No se encontraron Pokémon</p>
        )}
      </div>
    </div>
  );
}

export default App;
