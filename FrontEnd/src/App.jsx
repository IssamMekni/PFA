import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; // Import your custom theme
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import ViewResult from "./components/ViewResult";
const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <div style={{ paddingTop: "0" }}>
          {" "}
          {/* Add padding to account for the fixed header */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/api/auth/register" element={<LoginPage/>}/>
            <Route path="/d" element={<Dashboard />} />
            <Route path="/lab-results/:id" element={<ViewResult />} />

          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
