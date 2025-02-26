import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./components/Home.jsx";
import Login from "./pages/Login.jsx";
import Upload from "./pages/Upload.jsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./helper/theme.js";
import { CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./helper/AuthContext.jsx";
import { client_id } from "./helper/oauthContent.js";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={client_id}>
    <AuthProvider>
      {" "}
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Navigate to={"/login"} />} />
            <Route path="/dashboard" element={<Home />}>
              <Route path="upload" element={<Upload />}></Route>
              <Route path="list" element={<h1>List</h1>}></Route>
            </Route>

            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
