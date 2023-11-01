import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6d6d6d', // Un gris suave
        },
        secondary: {
            main: '#b3b3b3', // Un gris más claro para contrastar
        },
        background: {
            default: '#f5f5f5', // Un color de fondo muy claro
        },
        text: {
            primary: '#333333', // Texto oscuro para contrastar con el fondo claro
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
    },
});

export default theme;
