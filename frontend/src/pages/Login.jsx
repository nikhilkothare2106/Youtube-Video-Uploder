import { Box, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../helper/AuthContext";
function Login() {
  const navigate = useNavigate();
  const { token, loginUser } = useAuth();
  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/youtube.upload",
    onSuccess: (response) => {
      loginUser(response.access_token);
      navigate("/dashboard/upload");
    },
    onError: (error) => {
      toast.error("Login Error");
    },
  });
  return (
    <Box
      component={"section"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        startIcon={<GoogleIcon />}
        size="large"
        variant="contained"
        onClick={() => {
          login();
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
}

export default Login;
