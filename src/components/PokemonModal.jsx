import PropTypes from 'prop-types';
import {
  Modal,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
const PokemonModal = ({ open, onClose, pokemon, showShiny, setShowShiny }) => {

  if (!pokemon) return null;

  const hasShiny = !!pokemon.shinySprite; // Check if the shiny sprite exists

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          backgroundColor: '#191724',
          width: 400,
          boxShadow: 24,
          borderRadius: 2,
          outline: 'none', // Remove default focus outline
          '@media (max-width: 600px)': {
            width: '90%',
          },
        }}
      >
        <CardMedia
          component='img'
          image={showShiny && hasShiny ? pokemon.shinySprite : pokemon.sprite}
          alt={`${pokemon.name} ${showShiny ? 'Shiny' : 'Default'}`}
          sx={{
            width: '250px',
            margin: '0 auto',
            mt: 2,
            imageRendering: 'pixelated',
            '@media (max-width: 600px)': {
              width: '96px',
            },
          }}
        />
        <CardContent>
          {/* Switch to toggle shiny sprite */}
          <FormControlLabel
            control={
              <Switch
                checked={showShiny}
                onChange={() => setShowShiny(!showShiny)}
                disabled={!hasShiny} // Disable switch if no shiny sprite
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#eb6f92', // Color the switch when checked
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#eb6f92', // Track color when checked
                  },
                  '& .MuiSwitch-switchBase.Mui-disabled': {
                    color: '#191724', // Color when disabled (optional)
                  },
                }}
              />
            }
            label='Shiny version'
            sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
          />

          <Typography variant='h5' align='center' gutterBottom>
            {pokemon.name.toUpperCase()}
          </Typography>

          {/* Description Section */}
          <Typography
            variant='body2'
            sx={{
              mb: 2,
              fontStyle: 'italic',
              color: '#eb6f92',
            }}
          >
            {pokemon.description || 'No description available.'}
          </Typography>

          {/* Stats Section */}
          <Typography variant='subtitle1'>Stats:</Typography>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                <Typography>
                  {stat.name.toUpperCase()}: {stat.value}
                </Typography>
              </li>
            ))}
          </ul>

          {/* Types Section */}
          <Typography variant='subtitle1'>Types:</Typography>
          <ul>
            {pokemon.types.map((type) => (
              <li key={type}>
                <Typography>{type.toUpperCase()}</Typography>
              </li>
            ))}
          </ul>

          {/* Region Section */}
          <Typography variant='subtitle1'>Region:</Typography>
          <Typography>{pokemon.region}</Typography>

          <Button
            fullWidth
            variant='contained'
            sx={{
              mt: 2,
              color: '#eb6f92',
              backgroundColor: '#191724',
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
    shinySprite: PropTypes.string, // Pokémon shiny sprite URL
    description: PropTypes.string, // Pokémon description
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired, // Stat name
        value: PropTypes.number.isRequired, // Stat value
      })
    ).isRequired,
    region: PropTypes.string, // Pokémon region
    types: PropTypes.arrayOf(PropTypes.string), // Pokémon types
  }),
  showShiny: PropTypes.bool.isRequired, // Whether shiny sprite is displayed
  setShowShiny: PropTypes.func.isRequired, // Function to toggle shiny sprite
};

export default PokemonModal;
