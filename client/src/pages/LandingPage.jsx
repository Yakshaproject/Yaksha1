import { useTheme } from '@emotion/react'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    return (
        <Box width="100%" height="100%" sx={{
            backgroundImage: "url('./public/yaksha.png')",
            backgroundSize: "cover"
        }}>
            <Typography color="#ffffff" fontSize="5rem" 
            position="absolute" right="20%" top="18%"
            >
                Welcome To
            </Typography>

            <Box width="25%"
            display="flex" justifyContent="space-between"
            position="absolute" right="22%" bottom="20%"
            >
                <Button sx={{
                    backgroundColor: theme.palette.primary.light,
                    color:"#ffffff",
                    padding: "0.5rem 1rem",
                    fontSize:"1.5rem"
                }}
                onClick = {() => navigate("/login")}
                >
                    Sign In
                </Button>

                <Button sx={{
                    backgroundColor: theme.palette.primary.light,
                    color:"#ffffff",
                    padding: "0.5rem 1rem",
                    fontSize:"1.5rem"
                }}
                onClick = {() => navigate("/register")}
                >
                    Register
                </Button>
            </Box>
        </Box>
    )
}

export default LandingPage
