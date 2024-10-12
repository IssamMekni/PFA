import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C6AB3', // Primary color (AppBar background)
      contrastText: '#FFFFFF', // Text color on primary
    },
    secondary: {
      main: '#2ECC71', // Secondary color (buttons, accents)
    },
    background: {
      default: '#F5F7FA', // Background color for the app
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Customize the font if needed
  },
});

export default theme;
