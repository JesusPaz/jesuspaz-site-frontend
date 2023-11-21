import React from 'react';
import { AppBar, Toolbar, Grid, Container, Typography, IconButton } from '@mui/material';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AppBar position="static" color="primary" sx={{ borderRadius: 0, margin: 0, top: 'auto', bottom: 0 }}>
            <Container maxWidth={false} disableGutters>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Grid container alignItems="center" spacing={1} justifyContent="flex-start">
                        <Typography color="inherit" sx={{ marginBottom: '-8px' }}>©Jesús Paz </Typography>
                    </Grid>
                    {isMobile ? null : (
                        <Grid container alignItems="center" spacing={1} justifyContent="flex-end">
                            <Grid item><IconButton color="inherit" component={Link} href="https://www.linkedin.com/in/jesus-paz-0"><LinkedInIcon /></IconButton></Grid>
                            <Grid item><IconButton color="inherit" component={Link} href="https://twitter.com/_jesuspaz"><TwitterIcon /></IconButton></Grid>
                            <Grid item><IconButton color="inherit" component={Link} href="https://www.youtube.com/@jesuspazb"><YouTubeIcon /></IconButton></Grid>
                            <Grid item><IconButton color="inherit" component={Link} href="https://github.com/JesusPaz"><GitHubIcon /></IconButton></Grid>
                        </Grid>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;