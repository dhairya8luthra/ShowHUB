import React, { useState } from 'react';
import { Paper, TextInput, PasswordInput, Button, Title, Text } from '@mantine/core';
import classes from './AuthenticationImage.module.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';

function AuthenticationImage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const [password, setPassword] = useState('');

  const handlelogin = () => {
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    })
      .then((response) => {
        // Save the JWT token in a cookie
        Cookies.set('token', response.data.token);
        navigate('/home');
      })
      .catch((error) => {
        console.error('Login error:', error);
        // Handle the error, e.g., display an error message
      });
      login(email);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to{' '}
            <Text component="span" inherit variant="gradient" gradient={{ from: '#ffa200', to: '#ffea00' }}>
              Show Hub!
            </Text>
          </Title>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            className={classes.title}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            className={classes.title}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button onClick={handlelogin} fullWidth mt="xl" size="md">
            Login
          </Button>
          <Text ta="center" mt="md">
            Don&apos;t have an account? Register
          </Text>
        </Paper>
      </div>
    </div>
  );
}

export default AuthenticationImage;