import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia, Box, Container } from '@mui/material';
import { useRouter } from 'next/router';

const utilidades = [
    {
        id: 1,
        nombre: 'Calculadora de Interés Compuesto',
        descripcion: 'Esta calculadora te muestra cuánto dinero ganarás con el tiempo si inviertes o pides un préstamo. Solo necesitas saber cuánto dinero tienes ahora, cuánto interés ganarás cada año y por cuánto tiempo.',
        imagen: '/images/money.jpg',
        ruta: '/utilidades/calculadora-de-interes-compuesto',
    },
];

const Utils = () => {
    const router = useRouter();

    const handleCardClick = (ruta) => {
        router.push(ruta);
    };

    return (
        <Container>
            <Box marginTop={3}>
                <Typography variant="h1" align="left" color="primary" gutterBottom>Utilidades</Typography>
            </Box>
            <Grid container spacing={3}>
                {utilidades.map((utilidad) => (
                    <Grid item xs={12} sm={6} md={4} key={utilidad.id}>
                        <Card onClick={() => handleCardClick(utilidad.ruta)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={utilidad.imagen}
                                    alt={utilidad.nombre}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {utilidad.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {utilidad.descripcion}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Utils;