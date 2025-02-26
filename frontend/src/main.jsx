import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./components/Home.jsx";
import Login from "./pages/Login.jsx";
import Upload from "./pages/Upload.jsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./helper/theme.js";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Navigate to={"/login"} />} />
          <Route path="upload" element={<Upload />}></Route>
          <Route path="list" element={<h1>List</h1>}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
