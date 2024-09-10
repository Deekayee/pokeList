import React, { useEffect } from "react";
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
  Box, // Import Box for centering
} from "@mui/material";

const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",  // Display as flex
          justifyContent: "center", // Horizontally center
          alignItems: "center", // Vertically center
          height: "75vh", // Full-screen height
        }}
      >
        <CircularProgress size={80} sx={{ color: "#eb6f92" }} />
      </Box>
    );

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <List>
      {pokemons.map((pokemon) => (
        <ListItem
          key={pokemon.name}
          sx={{
            borderRadius: "8px", // Rounded corners
            border: "1px solid rgba(255, 255, 255, 0.2)", // Light border
            marginBottom: "8px", // Spacing between items
          }}
        >
          <ListItemAvatar>
            <Avatar
              src={pokemon.sprite}
              alt={pokemon.name}
            />
          </ListItemAvatar>
          <ListItemText primary={pokemon.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default PokemonList;
