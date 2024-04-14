
import React from 'react';
import { Card, Image, Text, Group, Center, Button } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './FeaturesCard.module.css';

export default function FeaturesCard({ movie }) {
  const castList =
    movie?.cast?.map((actor, index) => (
      <Text key={index} fz="xs" c="dimmed" style={{ lineHeight: '1.5' }}>
        {actor}
      </Text>
    ));

  return movie ? (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={movie.poster_link} alt={movie.title} w={350} h={100} />
      </Card.Section>
      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{movie.title}</Text>
          <Text fz="xs" c="dimmed">
            Title
          </Text>
        </div>
      </Group>
      <Card.Section className={classes.section}>
        <Text fz="sm" c="dimmed" className={classes.label}>
          Cast
        </Text>
        <Text fw={500}>{movie.actors}</Text>
        <div className={classes.castList}>{castList}</div>
      </Card.Section>
      <Card.Section className={classes.section}>
        <Text fz="sm" c="dimmed" className={classes.label}>
          Genre
        </Text>
        <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
          {movie.genre}
        </Text>
      </Card.Section>
      <Card.Section className={classes.section}>
        <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
          <Button radius="xl" style={{ width: '100%' }}>
            Book now
          </Button>
        </Link>
      </Card.Section>
    </Card>
  ) : null;
}