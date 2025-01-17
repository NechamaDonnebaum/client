import * as React from 'react';
import { Avatar, Button, TextField, Link, Grid, Box, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthContext } from '../../../context/authContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const register = async (userDetails) => {
    const res = await axios.post(
      "http://localhost:3600/api/auth/register",
      userDetails,
      {
        //  withCredentials: true
      }
    );
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      await register(userDetails);
      navigate('/login');
    } 
    catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid item >
              <Typography variant="body2" color="textSecondary" align="center">
                {error ? `${error}` : ''}
              </Typography>
            </Grid>
          </Box>
        </Box>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'By clicking Sign Up, you agree to our '}
            <Link color="inherit" href="#">
              Terms
            </Link>
            {' and '}
            <Link color="inherit" href="#">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
