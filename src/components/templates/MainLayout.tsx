import React from 'react';
import { Container } from '@mui/material';
import { Navbar } from '../molecules/Navbar';

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
        </>
    )
}