import { useTheme } from "@emotion/react"
import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";



const Navbar = () => {
    const theme = useTheme();
    console.log(theme);
    const navigate = useNavigate();
    const neutralLight = theme.palette.primary.main;
    const { isLoogedIn } = useAppContext()

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center"
            sx={{
                backgroundColor: theme.palette.neutral.light
            }} px="2rem"
        >
            <Box
                onClick={() => {
                    navigate("/home");
                }}
                display="flex" alignItems="center" >
                <img src="./public/Yaksha_logo.png" alt="Logo" style={{ marginRight: '1rem', marginBottom: "10px" }} width="40rem" />
                <Typography color={neutralLight} fontSize="2rem">
                    Yaksha
                </Typography>
            </Box>

            <Button sx={{
                fontSize: "2rem",
                textTransform: "capitalize"
            }}
                onClick={() => {
                    navigate("/login")
                }}
            >
                {isLoogedIn ? <SignOutButton /> : "Sign In"}
            </Button>
        </Box>
    )
}

export default Navbar
