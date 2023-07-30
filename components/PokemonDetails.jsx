import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetails = () => {
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setPokemonNumber(event.target.value);
  };

  const handleUpdateClick = () => {
    setPokemonData(null);
    setError(null);
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (pokemonNumber !== '') {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
          );

          const { name, types, sprites } = response.data;
          const pokemonDetails = {
            name,
            type: types[0].type.name,
            spriteUrl: sprites.front_default,
          };
          setPokemonData(pokemonDetails);
        } catch (error) {
          setError('Pokémon não encontrado. Verifique o número digitado.');
        } finally {
          setLoading(false);
        }
      } else {
        setPokemonData(null);
      }
    };

    fetchPokemonDetails();
  }, [pokemonNumber]);

  return (
    <div>
      <h2>Buscar Detalhes do Pokémon</h2>
      <input
        type="number"
        placeholder="Digite o número do Pokémon"
        value={pokemonNumber}
        onChange={handleInputChange}
      />
      <button onClick={handleUpdateClick}>Atualizar</button>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          <p>Nome do Pokémon: {pokemonData.name}</p>
          <p>Tipo: {pokemonData.type}</p>
          <img src={pokemonData.spriteUrl} alt={pokemonData.name} />
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;