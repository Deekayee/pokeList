import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../pokemonSlice';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
  Pagination,
} from '@mui/material';
import PokemonModal from './PokemonModal';
import SearchBox from './SearchBox';

const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state.pokemon);

  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [showShiny, setShowShiny] = useState(false); // Track shiny switch state
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query

// Handle Search Input Change
const handleSearchChange = (event) => {
  setSearchQuery(event.target.value);
  setCurrentPage(1); // Reset to the first page when search changes
};

// Filtered Pokémon List Based on Search Query
const filteredPokemons = pokemons.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
);

// Paginate Filtered Results
const itemsPerPage = 20; // Number of Pokémon per page
const paginatedPokemons = filteredPokemons.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


const handleClose = () => {
  setOpen(false);
  setSelectedPokemon(null);
  setShowShiny(false); // Reset shiny state when modal closes
};

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const handleOpen = (pokemonUrl) => {
    // Find the selected Pokémon object in the Redux store
    const pokemonData = pokemons.find((pokemon) => pokemon.url === pokemonUrl);

    if (pokemonData) {
      setSelectedPokemon({
        name: pokemonData.name,
        sprite: pokemonData.sprite,
        shinySprite: pokemonData.shinySprite,
        description: pokemonData.description, // Include description
        stats: pokemonData.stats, // Include stats
      });
      setOpen(true);
    } else {
      console.error('Selected Pokémon not found in Redux store');
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page
  };

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '75vh',
          '@media (max-width: 600px)': {
            height: '40vh',
          },
        }}
      >
        <CircularProgress size={80} sx={{ color: '#eb6f92' }} />
      </Box>
    );

  if (error) return <Typography color='error'>Error: {error}</Typography>;

  return (
    <>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchChange={handleSearchChange} />{' '}
      {/* Search box */}
      <List>
        {paginatedPokemons.map((pokemon) => (
          <ListItem
            key={pokemon.name}
            sx={{
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '8px',
              cursor: 'pointer',
            }}
            onClick={() => handleOpen(pokemon.url)}
          >
            <ListItemAvatar>
              <Avatar src={pokemon.sprite} alt={pokemon.name} />
            </ListItemAvatar>
            <ListItemText primary={pokemon.name} />
          </ListItem>
        ))}
      </List>
      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          mb: 5, // Add bottom margin
        }}
      >
        <Pagination
          count={Math.ceil(filteredPokemons.length / itemsPerPage)} // Total pages
          page={currentPage} // Current page
          onChange={handlePageChange} // Handle page change
          color='primary'
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#faf4ed', // Default text color
              fontSize: '1rem', // Default size for desktop
            },
            '& .MuiPaginationItem-page': {
              borderRadius: '50%', // Circular buttons
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: '#eb6f92', // Selected page background
              color: '#191724', // Selected page text color
              '&:hover': {
                backgroundColor: '#eb6f92', // Hover over selected page
              },
            },
            '& .MuiPaginationItem-page:not(.Mui-selected):hover': {
              backgroundColor: '#26233a', // Hover over unselected page
            },
            '& .MuiPaginationItem-previousNext:not(.Mui-disabled):hover': {
              backgroundColor: '#26233a', // Hover color for arrows (previous/next buttons)
            },
            // Responsive styles for mobile
            '@media (max-width: 600px)': {
              '& .MuiPaginationItem-root': {
                fontSize: '0.8rem', // Smaller text size on mobile
                minWidth: '25px', // Reduce button width
                height: '25px', // Reduce button height
              },
            },
          }}
        />
      </Box>
      {/* Modal component */}
      <PokemonModal
        open={open}
        onClose={handleClose}
        pokemon={selectedPokemon}
        showShiny={showShiny}
        setShowShiny={setShowShiny}
      />
    </>
  );
};

export default PokemonList;
