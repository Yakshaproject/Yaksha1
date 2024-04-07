import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import LandingPage from "./pages/LandingPage";


const App = () => {
  const { isLoogedIn } = useAppContext()
  const mode = "dark"
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <Box width="100%" height="100%">
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <Routes >
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login /> } />
            {isLoogedIn && <>
              <Route path="/home" element={isLoogedIn ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/quiz" element={<Quiz />} />
            
            </>}
              

          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </Box>
  )
}

export default App;
