import { Typography, Box, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Header = () => {
  return (
    <>
      <Typography variant='h3' component='h1'>
        POKÉMON LIST
      </Typography>
      <Box display='flex' alignItems='center' mb={2}>
        <Typography variant='h6' component='p'>
          ✨ Made by Deekaye ✨
        </Typography>
        <IconButton
          aria-label='GitHub repository'
          href='https://github.com/Deekayee/pokeList'
          target='_blank'
          rel='noopener'
          sx={{ color: '#faf4ed', marginLeft: 1 }}
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default Header;