import Navbar from './Navbar';
import Footer from './Footer';
import Box from '@mui/material/Box';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Box sx={{ flex: 1 }}>
                <main>{children}</main>
            </Box>
            <Footer />
        </>
    );
};

export default Layout;
