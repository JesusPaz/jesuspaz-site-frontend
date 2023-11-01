import { AppBar, Toolbar, Button, Grid, Container, Drawer, List, ListItem, IconButton } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <List>
            <ListItem button component={Link} href="/" onClick={handleDrawerToggle}>Inicio</ListItem>
            <ListItem button component={Link} href="/blog" onClick={handleDrawerToggle}>Blog</ListItem>
            <ListItem button component={Link} href="/videos" onClick={handleDrawerToggle}>Videos</ListItem>
            <ListItem button component={Link} href="/utilidades" onClick={handleDrawerToggle}>Utilidades</ListItem>
        </List>
    );

    return (
        <AppBar position="static" color="primary" sx={{ borderRadius: 0, margin: 0 }}>
            <Container maxWidth={false} disableGutters>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Image src="/logo.svg" alt="Logo" width={100} height={50} sx={{ display: { xs: 'none', md: 'block' } }} />
                    {isMobile ? (
                        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                            {drawer}
                        </Drawer>
                    ) : (
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item><Button color="inherit" component={Link} href="/">Inicio</Button></Grid>
                            <Grid item><Button color="inherit" component={Link} href="/blog">Blog</Button></Grid>
                            <Grid item><Button color="inherit" component={Link} href="/videos">Videos</Button></Grid>
                            <Grid item><Button color="inherit" component={Link} href="/utilidades">Utilidades</Button></Grid>
                        </Grid>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
