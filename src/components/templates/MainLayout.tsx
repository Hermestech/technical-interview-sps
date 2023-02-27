import React from 'react';
import { Box, Container } from '@mui/material';
import { Navbar } from '../molecules/Navbar';
import { Footer } from '../molecules/Footer';

type MainLayoutProps = {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) { 
    return (
        <>
        <Navbar />
            <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
            {children}
        </Container>
        <Footer />
        </>
    )
}