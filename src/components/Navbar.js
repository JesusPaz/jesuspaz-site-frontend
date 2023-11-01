import { AppBar, Toolbar, Typography, Button, Grid, Container } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
    return (
        <AppBar position="static" color="primary" sx={{ borderRadius: 0, margin: 0 }}>
            <Container maxWidth={false} disableGutters>
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                                Jesús Paz
                            </Typography>
                        </Grid>

                        <Grid item><Button color="inherit" component={Link} href="/">Inicio</Button></Grid>
                        <Grid item><Button color="inherit" component={Link} href="/blog">Blog</Button></Grid>
                        <Grid item><Button color="inherit" component={Link} href="/videos">Videos</Button></Grid>
                        <Grid item><Button color="inherit" component={Link} href="/utilidades">Utilidades</Button></Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
