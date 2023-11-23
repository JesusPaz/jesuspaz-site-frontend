import {
    Box, Typography, Container
} from '@mui/material';
import Image from 'next/image';

function Custom404() {
    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h1" component="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                ¡Vaya! Página no encontrada.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Lo siento, la página que estás buscando no existe.
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                    },
                }}
            >
                <Image src="/images/jesus_dancing.gif" alt="Simpsons Gif 1" width={120} height={240} />
            </Box>

        </Container>
    );
}

export default Custom404;