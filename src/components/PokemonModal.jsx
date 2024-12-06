import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const PokemonModal = ({ open, onClose, pokemon }) => {
  if (!pokemon) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          backgroundColor: "#191724",
          width: 400,
          boxShadow: 24,
          borderRadius: 2,
          outline: "none", // Remove default focus outline
        }}
      >
        <CardMedia
          component="img"
          image={pokemon.sprite}
          alt={pokemon.name}
          sx={{ width: "100px", margin: "0 auto", mt: 2 }}
        />
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {pokemon.name.toUpperCase()}
          </Typography>

          {/* Description Section */}
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              fontStyle: "italic",
              color: "#eb6f92",
            }}
          >
            {pokemon.description || "No description available."}
          </Typography>

          {/* Stats Section */}
          <Typography variant="subtitle1">Stats:</Typography>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                <Typography>
                  {stat.name.toUpperCase()}: {stat.value}
                </Typography>
              </li>
            ))}
          </ul>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              color: "#eb6f92",
              backgroundColor: "#191724",
            }}
            onClick={onClose}
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

// Add PropTypes for validation
PokemonModal.propTypes = {
  open: PropTypes.bool.isRequired, // Modal open state
  onClose: PropTypes.func.isRequired, // Function to close the modal
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired, // Pokémon name
    sprite: PropTypes.string.isRequired, // Pokémon sprite URL
    description: PropTypes.string, // Pokémon description
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired, // Stat name
        value: PropTypes.number.isRequired, // Stat value
      })
    ).isRequired,
  }),
};

export default PokemonModal;
