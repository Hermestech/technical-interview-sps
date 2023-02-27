import * as React from 'react';
import { Box } from '@mui/material'


type Props = {
    children: React.ReactNode;
}


const styles = {
    position: 'relative',
    padding: '16px',
    shadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
    backgroundColor: 'background.paper',
}

export const LoginInitialStructure = ({ children }: Props) => { 
    return (
        <Box sx={styles}>
            {children}
        </Box>
    )
}