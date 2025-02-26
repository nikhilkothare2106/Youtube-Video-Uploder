import React from "react";
import { Navigate, Outlet } from "react-router";
import NavBar from "./NavBar";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../helper/AuthContext";

function Home() {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Home;
