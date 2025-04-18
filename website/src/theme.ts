import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954', // Bright green for buttons
    },
    secondary: {
      main: '#3399ff', // Blue for links and secondary elements
    },
    background: {
      default: '#000000', // Black background
      paper: '#121212', // Slightly lighter black for paper elements
    },
    text: {
      primary: '#ffffff',
      secondary: '#4d9be3', // Blue for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 500,
      color: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#1DB954',
          color: 'white',
          '&:hover': {
            backgroundColor: '#18a049',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#333333',
            },
            '&:hover fieldset': {
              borderColor: '#555555',
            },
          },
        },
      },
    },
  },
});
