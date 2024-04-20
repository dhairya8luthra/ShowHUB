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

            <Text className={classes.description}   mt={40} color='white'>
            ShowHub is a cutting-edge solution revolutionizing cineplex management systems. With its user-friendly interface and powerful features, ShowHub streamlines every aspect of cineplex operations. From scheduling screenings to managing ticket sales and concessions, ShowHub automates tedious tasks, saving time and boosting efficiency. Its advanced analytics provide valuable insights into audience preferences and trends, enabling cineplexes to tailor their offerings for maximum profitability. With ShowHub, cineplexes can deliver an exceptional moviegoing experience while optimizing their operations for success in today's competitive market.
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