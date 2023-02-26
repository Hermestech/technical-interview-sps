import React from 'react';
import { Box } from '@mui/material';
import { Navbar } from '../molecules/Navbar';
import { Footer } from '../molecules/Footer';

type MainLayoutProps = {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) { 
    return (
        <>
        <Navbar />
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            maxWidth: '100vw',
        }}>
            
            <Box sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
        </>
    )

}