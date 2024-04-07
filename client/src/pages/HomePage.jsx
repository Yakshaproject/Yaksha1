import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import { useTheme } from '@emotion/react'

const HomePage = () => {
    const theme = useTheme()
    return (
        <Box height="100vh">
            <Navbar />
            <Box width="100%" height="100%" 
                display="flex" justifyContent="center" alignItems="center"
            >
                <Button sx={{
                    backgroundColor: theme.palette.background.alt,
                    fontSize: "5rem",

                }}>
                    Start Quest
                </Button>
            </Box>

        </Box>
    )
}

export default HomePage
