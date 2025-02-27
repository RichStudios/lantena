import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { loginUser, signUpUser } from '../api'; // Ensure signUpUser is exported

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ...(isLogin ? {} : { firstName: '', lastName: '', address: '', phone: '', confirmPassword: '' }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      if (isLogin) {
        const response = await loginUser({ email: formData.email, password: formData.password });
        console.log("Login success:", response);
        // Redirect or further actions
      } else {
        const response = await signUpUser(formData);
        console.log("Sign Up success:", response);
        // Redirect or further actions
      }
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Sign Up'} failed:`, error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {!isLogin && (
        <>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </>
      )}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {!isLogin && (
        <>
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            label="Phone / Mobile Number"
            fullWidth
            margin="normal"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </>
      )}
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {!isLogin && (
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      )}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default AuthForm;
