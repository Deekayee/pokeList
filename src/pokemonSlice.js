import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async () => {
    const generationToRegionMap = {
      'generation-i': 'Kanto',
      'generation-ii': 'Johto',
      'generation-iii': 'Hoenn',
      'generation-iv': 'Sinnoh',
      'generation-v': 'Unova',
      'generation-vi': 'Kalos',
      'generation-vii': 'Alola',
      'generation-viii': 'Galar',
      'generation-ix': 'Paldea',
    };

    const response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=100000'
    );

    const pokemonData = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const pokeDetail = await axios.get(pokemon.url);
        const speciesDetail = await axios.get(pokeDetail.data.species.url);

        const descriptionEntry = speciesDetail.data.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
        );
        const description = descriptionEntry
          ? descriptionEntry.flavor_text.replace(/\n|\f/g, ' ')
          : 'No description available.';

        const stats = pokeDetail.data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        }));

        const generationName = speciesDetail.data.generation.name;
        const region = generationToRegionMap[generationName] || 'Unknown';

        return {
          name: pokemon.name,
          sprite: pokeDetail.data.sprites.front_default,
          shinySprite: pokeDetail.data.sprites.front_shiny,
          url: pokemon.url,
          description,
          stats,
          region,
          types: pokeDetail.data.types.map((t) => t.type.name),
        };
      })
    );
    return pokemonData;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: { pokemons: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
