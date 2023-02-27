import React from 'react'
import  { Player } from '@lottiefiles/react-lottie-player'

import { Box,Typography } from '@mui/material'

export const ProductNotFound = () => (
<Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
      gridColumn: '1 / 4'
    }}
    >
        <Player
        src="https://assets4.lottiefiles.com/private_files/lf30_aiwdh2wk.json"
        className="player"
        autoplay
        loop
        style={{ height: '200px', width: '250px' }}
     />
    <Typography variant='h5' color='secondary'>
      oops! no products found :(
    </Typography>
  </Box>
)