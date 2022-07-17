import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    AppBar,
    Box,
    Button,
    Container,
    Link as MuiLink,
    styled,
    Toolbar,
    Typography
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Login as LoginIcon } from '@mui/icons-material';

type Props = {
    title?: string;
    children?: JSX.Element | JSX.Element[];
}

const CustomizedLink = styled(MuiLink)(
    ({ theme }) => `
    :hover {
        color: ${theme.palette.secondary.main}
    };
    `
)

function Layout({ children }: Props) {
    const NavLink = ({ children }: Props) => {
    return (
        <CustomizedLink
            color="inherit"
            underline="none" ml={3}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                minWidth: '50px',
                alignItems: 'center',
                cursor: 'pointer'
            }}>
            { children }
        </CustomizedLink>
    );
}
    return (
        <Box>
            <Head>
                <title>Next Amazona</title>
            </Head>    
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between'}}>
                    <Link href="/" passHref>
                        <CustomizedLink color="inherit" underline="none">
                            <Typography variant="h6" fontWeight="bold">amazona</Typography>
                        </CustomizedLink>
                    </Link>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <Link href="/cart" passHref>
                            <NavLink>
                                <ShoppingCartIcon sx={{ marginRight: 1, fontSize: '1.2rem' }} />
                                <Typography variant="body1">Cart</Typography>
                            </NavLink>
                        </Link>

                        <Link href="/login" passHref>
                            <NavLink>
                                <LoginIcon sx={{ marginRight: 1, fontSize: '1.2rem' }} />
                                <Typography variant="body1">Login</Typography>
                            </NavLink>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{ minHeight: '80vh'}}>
                { children }
            </Container>
            <Box component="footer" textAlign="center" my={3}>
                <Typography variant="body2">
                    All rights reserved. Next Amazona.
                </Typography>
            </Box>
        </Box>
  );
}

export default Layout;