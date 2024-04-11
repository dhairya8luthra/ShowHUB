import { Container, Title, Text, Button } from '@mantine/core';
import classes from './HeroImageRight.module.css';
import { Link } from 'react-router-dom';
export default function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome to{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: '#ffa200', to: '#ffea00' }}
              >
                Show Hub
              </Text>{' '}
              A Cineplex Management System
            </Title>

            <Text className={classes.description}   mt={30} color='white'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique repudiandae veritatis ratione amet ut, nulla fuga soluta vel velit, architecto aperiam. Explicabo cupiditate, veniam dolorum voluptatibus odit suscipit iusto ab accusantium maiores fugit sint quam aperiam, inventore temporibus nulla magni.
            </Text>
            <Link to={'/register'}>
            <Button
              variant="gradient"
              gradient={{ from: '#ffa200', to: '#ffea00' }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Sign up
            </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}