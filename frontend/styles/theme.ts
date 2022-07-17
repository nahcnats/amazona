import { createTheme } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
        main: '#203040',
        },
        secondary: {
        main: '#f8c040',
        },
        error: {
        main: red.A400,
        },
    },        
});

export default theme;