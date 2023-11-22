import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia } from '@mui/material';

const utilidades = [
    {
        id: 1,
        nombre: 'Calculadora de Interés Compuesto',
        descripcion: 'Esta calculadora te muestra cuánto dinero ganarás con el tiempo si inviertes o pides un préstamo. Solo necesitas saber cuánto dinero tienes ahora, cuánto interés ganarás cada año y por cuánto tiempo.',
        imagen: '/images/money.jpg'
    },
];

const Utils = () => {
    return (
        <>
            <Typography variant="h2" align="left" gutterBottom>Utilidades</Typography>
            <Grid container spacing={3}>
                {utilidades.map((utilidad) => (
                    <Grid item xs={12} sm={6} md={4} key={utilidad.id}>
                        <Card>
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
        </>
    );
};

export default Utils;