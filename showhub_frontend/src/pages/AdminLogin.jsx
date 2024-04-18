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

  const handleLogin = () => {
    const url =  'http://localhost:3001/admin/login';

    Axios.post(url, { email, password })
      .then((response) => {
        Cookies.set('token', response.data.token);
        navigate('/modifydatabase');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });

    login(email,true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome{' '}
            <Text component="span" inherit variant="gradient" gradient={{ from: '#ffa200', to: '#ffea00' }}>
              {'Admin'}
            </Text>
          </Title>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            className={classes.title}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            className={classes.title}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} fullWidth mt="xl" size="md">
            {'Admin Login'}
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default AuthenticationImage;