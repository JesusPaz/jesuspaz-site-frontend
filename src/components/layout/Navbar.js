import React from 'react';
import { AppBar, Toolbar, IconButton, Grid, Container, Drawer, List, ListItem, Slide, Button, ListItemButton } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };
    const trigger = useScrollTrigger();

    const drawer = (
        <List>
            <ListItemButton component={Link} href="/" onClick={handleDrawerToggle}>Inicio</ListItemButton >
            <ListItemButton component={Link} href="/blog" onClick={handleDrawerToggle}>Blog</ListItemButton >
            <ListItemButton component={Link} href="/videos" onClick={handleDrawerToggle}>Videos</ListItemButton >
            <ListItemButton component={Link} href="/utils" onClick={handleDrawerToggle}>Utilidades</ListItemButton >
        </List>
    );

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar position="static" color="primary" sx={{ borderRadius: 0, margin: 0 }}>
                    <Container maxWidth={false} disableGutters>
                        <Toolbar sx={{ justifyContent: 'space-between' }}>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
                                <MenuIcon />
                            </IconButton>
                            <Grid container alignItems="center" spacing={1} justifyContent={isMobile ? 'center' : 'flex-start'}>
                                <Grid item sx={{ ml: isMobile ? '-24px' : 4, mr: isMobile ? 0 : 4, mb: '-4px' }}>
                                    <Image src="/logo.svg" alt="Logo" width={120} height={60} />
                                </Grid>
                                {isMobile ? null : (
                                    <>
                                        <Grid item><Button color="inherit" component={Link} href="/">Inicio</Button></Grid>
                                        <Grid item><Button color="inherit" component={Link} href="/blog">Blog</Button></Grid>
                                        <Grid item><Button color="inherit" component={Link} href="/videos">Videos</Button></Grid>
                                        <Grid item><Button color="inherit" component={Link} href="/utils">Utilidades</Button></Grid>
                                    </>
                                )}
                            </Grid>
                            {isMobile && (
                                <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                                    {drawer}
                                </Drawer>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </Slide>
        </>
    );
};

export default Navbar;
