import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// Login Component
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Login submitted:", formData);
      alert("Login successful!");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
        fullWidth
        InputProps={{
          startAdornment: <EmailIcon />,
        }}
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        required
        fullWidth
        InputProps={{
          startAdornment: <LockIcon />,
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={handleSubmit}
        sx={{
          marginTop: "16px",
          padding: "16px",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        }}
      >
        Sign In
      </Button>

      <Box sx={{ textAlign: "center", marginTop: "24px" }}>
        <Typography variant="body2" color="textSecondary">
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
