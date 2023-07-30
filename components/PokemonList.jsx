import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=20'
        );

        const results = response.data.results;
        setPokemonList(results);
      } catch (error) {
        setError('Erro ao buscar a lista de Pokémon.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div>
      <h2>Lista de Pokémon</h2>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;