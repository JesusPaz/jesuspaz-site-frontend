import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia, Box, Container } from '@mui/material';
import { useRouter } from 'next/router';

const blogs = [
    {
        id: 1,
        title: 'Coming Soon',
        description: 'Stay tuned for upcoming blog posts.',
        image: '/images/coming_soon.jpg',
        route: '/blog/coming-soon',
    },
];

const Blog = () => {
    const router = useRouter();

    const handleCardClick = (route) => {
        router.push(route);
    };

    return (
        <Container>
            <Box marginTop={3}>
                <Typography variant="h2" align="left" color="primary" gutterBottom>Blog</Typography>
            </Box>
            <Grid container spacing={3}>
                {blogs.map((blog) => (
                    <Grid item xs={12} sm={6} md={4} key={blog.id}>
                        <Card onClick={() => handleCardClick(blog.route)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={blog.image}
                                    alt={blog.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {blog.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {blog.description}
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

export default Blog;