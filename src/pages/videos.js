import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia, Box, Container } from '@mui/material';
import { useRouter } from 'next/router';

const videos = [
    {
        id: 1,
        title: 'Coming Soon',
        description: 'Stay tuned for upcoming videos.',
        image: '/images/coming_soon.jpg',
        route: '/videos/coming-soon',
    },
];

const Videos = () => {
    const router = useRouter();

    const handleCardClick = (route) => {
        router.push(route);
    };

    return (
        <Container>
            <Box marginTop={3}>
                <Typography variant="h1" align="left" color="primary" gutterBottom>Videos</Typography>
            </Box>
            <Grid container spacing={3}>
                {videos.map((video) => (
                    <Grid item xs={12} sm={6} md={4} key={video.id}>
                        <Card onClick={() => handleCardClick(video.route)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={video.image}
                                    alt={video.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {video.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {video.description}
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

export default Videos;
