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
import { DateInput } from '@mantine/dates';
import classes from './AuthenticationImage.module.css';
import Axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';
function AuthenticationImage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); // Add firstName state variable
  const [lastName, setLastName] = useState(''); // Add lastName state variable
  const [dateOfBirth, setDateOfBirth] = useState(''); // Add dateOfBirth state variable
  const navigate = useNavigate(); // Initialize useHistory hook
  const { login } = useAuth();

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
    })
      .then((response) => {
        console.log(response.data); // Check the response data
        // Handle the response data as needed
        if (response.data.token) {
          // Save the JWT token in a cookie
          Cookies.set('token', response.data.token);
          navigate('/home');
          login(email);
        } else {
          // Handle the case when the server does not return a token
          console.error('Server did not return a token');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error case
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
          <TextInput
            label="First Name"
            placeholder="John"
            size="md"
            className={classes.title}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
           <TextInput
            label="Last Name"
            placeholder="Doe"
            size="md"
            className={classes.title}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <DateInput
      value={dateOfBirth}
      valueFormat="YYYY-MM-DD"
      onChange={setDateOfBirth}
      className={classes.title}
      label="Date input"
      placeholder="Date input"
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
