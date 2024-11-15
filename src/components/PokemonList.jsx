import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../pokemonSlice";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import PokemonModal from "./PokemonModal"; // Import the new modal component

const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state.pokemon);

  const [open, setOpen] = useState(false); // Modal open state
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Selected Pokémon data

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const handleOpen = async (pokemonUrl) => {
    try {
      const response = await axios.get(pokemonUrl);
      setSelectedPokemon({
        name: response.data.name,
        sprite: response.data.sprites.front_default,
        stats: response.data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
      });
      setOpen(true);
    } catch (error) {
      console.error("Failed to fetch Pokémon details", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPokemon(null);
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        <CircularProgress size={80} sx={{ color: "#eb6f92" }} />
      </Box>
    );

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <>
      <List>
        {pokemons.map((pokemon) => (
          <ListItem
            key={pokemon.name}
            sx={{
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              marginBottom: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleOpen(pokemon.url)} // Fetch details and open modal
          >
            <ListItemAvatar>
              <Avatar src={pokemon.sprite} alt={pokemon.name} />
            </ListItemAvatar>
            <ListItemText primary={pokemon.name} />
          </ListItem>
        ))}
      </List>

      {/* Modal component */}
      <PokemonModal open={open} onClose={handleClose} pokemon={selectedPokemon} />
    </>
  );
};

export default PokemonList;
