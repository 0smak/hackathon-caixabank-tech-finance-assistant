import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { useStore } from "@nanostores/react"; // Nanostores to track auth
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NotificationProvider } from "./Context/NotificationContext";
import Analysis from "./components/Analysis";
import BudgetAlert from "./components/BudgetAlert"; // Importar BudgetAlert
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; // Import for route protection
import RegisterPage from "./components/RegisterPage";
import Settings from "./components/Settings";
import SupportPage from "./components/SupportPage";
import TransactionList from "./components/TransactionList";
import { authStore } from "./stores/authStore"; // Import auth store for authentication state
import { darkTheme, lightTheme } from "./theme"; // Import both themes
import ForgotPasswordPage from "./components/ForgotPasswordPage";

function App() {
  const auth = useStore(authStore);

  // State to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Use effect to apply theme on load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <NotificationProvider>
        <CssBaseline />
        <Router>
          <Box
            data-dark={String(isDarkMode)}
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <Container sx={{ flex: 1, mt: 4 }}>
              {auth.isAuthenticated && (
                <>
                  <BudgetAlert />
                </>
              )}
              <Routes>
                <Route
                  element={
                    <ProtectedRoute isAuthenticated={auth.isAuthenticated} />
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/transactions" element={<TransactionList />} />
                  <Route path="/analysis" element={<Analysis />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/support" element={<SupportPage />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
              </Routes>
            </Container>
            <Footer isDarkMode={isDarkMode} />
          </Box>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
