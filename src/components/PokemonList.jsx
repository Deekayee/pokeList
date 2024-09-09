import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../pokemonSlice';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, CircularProgress, Typography } from '@mui/material';

const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <List>
      {pokemons.map((pokemon) => (
        <ListItem key={pokemon.name}>
          <ListItemAvatar>
            <Avatar src={pokemon.sprite} />
          </ListItemAvatar>
          <ListItemText primary={pokemon.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default PokemonList;