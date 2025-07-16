import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from '@mui/material';
import Header from './components/Header';
import PokemonList from './components/PokemonList';

const theme = createTheme({
  palette: {
    mode: 'dark', // Dark mode
    background: {
      default: '#191724', // dark background for the body
    },
    text: {
      primary: '#faf4ed', // white text
    },
  },
  typography: {
    allVariants: {
      color: '#faf4ed', // Ensure all text is white
      fontFamily: "'JetBrains Mono', monospace", // Use JetBrains Mono font
    },
    h3: {
      fontWeight: 100,
      marginTop: '16px',
      letterSpacing: '5px',
      alignItems: 'center',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#191724', // Dark background
          margin: 0, // Remove default margin
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#191724', // Dark background for Container
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners for ListItems
          border: '1px solid rgba(255, 255, 255, 0.2)', // Light border around each ListItem
          marginBottom: '8px', // Spacing between list items
          backgroundColor: '#232136', // Dark background for ListItems
          textTransform: 'capitalize', // Capitalize Pokemon names
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 75,
          height: 75, // Increase avatar size
          marginRight: '15px', // Spacing between avatars and text
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header />
        <PokemonList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
