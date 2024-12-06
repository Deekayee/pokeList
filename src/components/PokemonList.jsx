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
  Pagination,
} from "@mui/material";
import PokemonModal from "./PokemonModal";
import SearchBox from "./SearchBox";

const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state.pokemon);

  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  const itemsPerPage = 50; // Limit of items per page

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
        description: pokemonData.description, // Include description
        stats: pokemonData.stats, // Include stats
      });
      setOpen(true);
    } else {
      console.error("Selected Pokémon not found in Redux store");
    }
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedPokemon(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page
  };

  // Filter Pokémon list based on search term
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  // Get paginated Pokémon for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPokemons = filteredPokemons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{" "}
      {/* Search box */}
      <List>
        {paginatedPokemons.map((pokemon) => (
          <ListItem
            key={pokemon.name}
            sx={{
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              marginBottom: "8px",
              cursor: "pointer",
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
          display: "flex",
          justifyContent: "center",
          mt: 4,
          mb: 5, // Add bottom margin
        }}
      >
        <Pagination
          count={Math.ceil(filteredPokemons.length / itemsPerPage)} // Total pages
          page={currentPage} // Current page
          onChange={handlePageChange} // Handle page change
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#faf4ed", // Default text color
              fontSize: "1rem", // Default size for desktop
            },
            "& .MuiPaginationItem-page": {
              borderRadius: "50%", // Circular buttons
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#eb6f92", // Selected page background
              color: "#191724", // Selected page text color
              "&:hover": {
                backgroundColor: "#eb6f92", // Hover over selected page
              },
            },
            "& .MuiPaginationItem-page:not(.Mui-selected):hover": {
              backgroundColor: "#26233a", // Hover over unselected page
            },
            "& .MuiPaginationItem-previousNext:not(.Mui-disabled):hover": {
              backgroundColor: "#26233a", // Hover color for arrows (previous/next buttons)
            },
            // Responsive styles for mobile
            "@media (max-width: 600px)": {
              "& .MuiPaginationItem-root": {
                fontSize: "0.8rem", // Smaller text size on mobile
                minWidth: "25px", // Reduce button width
                height: "25px", // Reduce button height
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
      />
    </>
  );
};

export default PokemonList;
