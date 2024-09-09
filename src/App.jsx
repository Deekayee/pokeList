import React from 'react';
import { createTheme, ThemeProvider, Container, Typography } from '@mui/material';
import PokemonList from './components/PokemonList';

const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h3" component="h1" gutterBottom>
          Pokemon List
        </Typography>
        <PokemonList />
      </Container>
    </ThemeProvider>
  );
};

export default App;