import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100000"
    );
    const pokemonData = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const pokeDetail = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          sprite: pokeDetail.data.sprites.front_default,
          url: pokemon.url,
        };
      })
    );
    return pokemonData;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
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
