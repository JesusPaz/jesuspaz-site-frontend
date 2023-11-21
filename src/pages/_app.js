import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
            <Script src="https://unpkg.com/react/umd/react.production.min.js" strategy="lazyOnload" />
            <Script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" strategy="lazyOnload" />
            <Script src="https://unpkg.com/prop-types/prop-types.min.js" strategy="lazyOnload" />
            <Script src="https://unpkg.com/recharts/umd/Recharts.js" strategy="lazyOnload" />
        </>
    );
}

export default MyApp;
