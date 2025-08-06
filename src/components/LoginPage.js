import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../stores/authStore";
import { checkCredentials, userStore } from "../stores/userStore";
import { useLocalStorage } from "../hooks/useLocalStorage";

function LoginPage() {
  useLocalStorage(userStore, "users");
  const defaultCredentials = {
    email: "default@example.com",
    password: "passworD_123",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    data: {
      email: "",
      password: "",
    },
    haveErrors: false,
  });

  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // we do that to remove the error from the current field but keep the other errors
    const haveOtherErrors = !!Object.entries(errors.data)
      .filter((key) => key !== name)
      .some((key) => !!key[1]);

    setErrors((prevState) => ({
      data: { ...prevState.data, [name]: "" },
      haveErrors: haveOtherErrors,
    }));

    setFormData((prevState) => ({ ...prevState, [name]: value.trim() }));
  };

  const validate = ({ email, password }) => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!checkCredentials(email, password, defaultCredentials)) {
      // we cannot tell the user if the email exists due to security reasons, so we inform that the password or email is incorrect
      errors.password =
        "The email is not registered or the password is incorrect";
    }

    const haveErrors = !!Object.keys(errors).length;

    setErrors({
      data: errors,
      haveErrors,
    });
    return !haveErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate that fields are not empty
    // Instructions:
    // - Check if the email and password fields are filled.
    const { email, password } = formData;
    const isValid = validate({ email, password });

    if (isValid) {
      const user = {
        email,
        password,
      };
      login(user);
      navigate("/");
    }

    // Validate credentials
    // Instructions:
    // - Check if the entered credentials match the default credentials or the stored user credentials.
    // - If valid, call the `login` function and navigate to the homepage.
    // - If invalid, set an error message.
  };

  const handleShowDefaultCredentials = () => {
    // Show default credentials in case the user requests it
    setFormData(defaultCredentials);
    setShowCredentials(true);
    setErrors({
      data: {
        email: "",
        password: "",
      },
      haveErrors: false,
    });
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
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} onChange={handleChange}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          fullWidth
          margin="normal"
          error={!!errors.data.email}
          helperText={errors.data.email}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          fullWidth
          margin="normal"
          error={!!errors.data.password}
          helperText={errors.data.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleShowDefaultCredentials}
          type="button"
          sx={{ mt: 2 }}
        >
          Show default credentials
        </Button>
      </form>

      {/* Show error message when applicable */}
      {/* - Use the Alert component to display the error message if one exists. */}
      {/* - Ensure that registration and forgot password options are displayed below the error message if present. */}

      <div sx={{ mt: 2 }}>
        <p>
          Don't have an account?{" "}
          <Link className="link link-login" to="/register">
            Register
          </Link>
          <br />
          Forgot your password?&nbsp;
          <Link className="link link-login" to="/forgot-password">
            Reset password
          </Link>
        </p>
      </div>

      {errors.haveErrors && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Invalid login credentials. Please try again.
        </Alert>
      )}

      {showCredentials && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <strong>Email:</strong> {defaultCredentials.email}
          <br />
          <strong>Password:</strong> {defaultCredentials.password}
        </Alert>
      )}
    </Box>
  );
}

export default LoginPage;
