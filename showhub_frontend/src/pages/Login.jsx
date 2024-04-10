import React from 'react';
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


function AuthenticationImage() {
  return (
    
    <div className={classes.container}>
      
      <div className={classes.wrapper}>
     
       
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: '#ffa200', to: '#ffea00' }}
                >
                  Show Hub!
                </Text>
          </Title>

          <TextInput label="Email address" placeholder="hello@gmail.com" size="md"  className={classes.title} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"  className={classes.title} />
          <Button fullWidth mt="xl" size="md">
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            
              Register
          </Text>
        </Paper>
      </div>
    </div>

  );
}

export default AuthenticationImage;
