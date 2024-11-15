import React from "react";
import {
  Modal,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

const PokemonModal = ({ open, onClose, pokemon }) => {
  if (!pokemon) return null; // Handle case when no Pokémon data is passed

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Card>
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
              sx={{ mt: 2 }}
              onClick={onClose}
            >
              Close
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default PokemonModal;
