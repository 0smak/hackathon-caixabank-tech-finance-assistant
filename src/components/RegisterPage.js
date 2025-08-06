import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { login } from "../stores/authStore";
import { REGEXP } from "../constants/regexp";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { userStore, addUser, getUserByEmail } from "../stores/userStore";

function RegisterPage() {
  useLocalStorage(userStore, "users");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    data: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    haveErrors: false,
  });
  const [success, setSuccess] = useState(false);
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

  const validate = ({ email, password, confirmPassword }) => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!REGEXP.EMAIL.test(email)) {
      errors.email = "Invalid email";
    } else if (!!getUserByEmail(email)) {
      errors.email = "Email already exists";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!REGEXP.PASSWORD.test(password)) {
      errors.password =
        "Invalid password, must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    const haveErrors = !!Object.keys(errors).length;
    setErrors({
      data: errors,
      haveErrors,
    });
    return !haveErrors;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Instructions:

    // Validate that all fields (email, password, confirmPassword) are filled.
    // - If any field is empty, display an error message.

    // Check if the passwords match.
    // - If the passwords do not match, set an appropriate error message.

    // Check if the email is already registered in localStorage.
    // - Retrieve the existing user from localStorage and verify if the entered email already exists.
    // - If the email exists, set an error message.

    // Save the new user's data to localStorage.
    // - If validation passes, store the new user's email and password in localStorage.

    // Automatically log the user in after successful registration.
    // - Call the `login` function to set the authenticated user in the store.

    // Redirect the user to the dashboard.
    // - After successful registration and login, redirect the user to the home/dashboard page.

    const { email, password, confirmPassword } = formData;

    const isValid = validate({ email, password, confirmPassword });

    if (isValid) {
      const user = {
        email,
        password,
      };

      addUser(user);
      login(user);

      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
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
        Register
      </Typography>
      <form onSubmit={handleRegister} onChange={handleChange}>
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

        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          fullWidth
          margin="normal"
          error={!!errors.data.confirmPassword}
          helperText={errors.data.confirmPassword}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>

      {errors.haveErrors && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Error(s) found in the form. Please fix them and try again.
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Account created successfully! Redirecting to dashboard...
        </Alert>
      )}
    </Box>
  );
}

export default RegisterPage;
