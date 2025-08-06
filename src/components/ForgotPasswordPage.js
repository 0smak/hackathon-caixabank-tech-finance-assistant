import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { getUserByEmail } from "../stores/userStore";
import { useNotification } from "../Context/NotificationContext";

function ForgotPasswordPage() {
  const { showNotification, closeNotification } = useNotification();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    closeNotification();

    const existUser = getUserByEmail(email);
    if (!existUser) {
      let errMsg = "No user found with that email";
      showNotification(errMsg);
      setError(errMsg);
      return;
    }

    setTimeout(() => {
      setMessage("Check your email for the reset password link");
    }, 500);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        my: 8,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 4,
        backgroundColor: "#fffffc",
        boxShadow: "5px 5px 25px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
        }}
        gutterBottom
      >
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Send Reset Link
        </Button>
      </form>
      {message && (
        <Typography color="secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default ForgotPasswordPage;
