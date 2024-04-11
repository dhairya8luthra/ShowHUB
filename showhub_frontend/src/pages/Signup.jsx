import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import classes from './AuthenticationImage.module.css';
import Axios from 'axios';
function AuthenticationImage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useHistory hook

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
        // Redirect to /home after successful registration
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome to{' '}
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: '#ffa200', to: '#ffea00' }}
            >
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
          <Button onClick={register} fullWidth mt="xl" size="md">
            Register
          </Button>

          <Text ta="center" mt="md">
            Login
          </Text>
        </Paper>
      </div>
    </div>
  );
}

export default AuthenticationImage;
