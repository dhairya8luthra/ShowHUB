import { Card, Image, Text, Group, Center ,Button} from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './FeaturesCard.module.css';

export default function FeaturesCard({ movie }) {
  const features =
    movie?.cast?.map((actor, index) => (
      <Center key={index}>
        <IconUsers size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="xs">{actor}</Text>
      </Center> 
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
      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Cast
        </Text>
        <Group gap={8} mb={-8}>
        <Text fz="xs" c="dimmed">
        {movie.actors}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              {movie.genre}
            </Text>
          </div>
          <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
            <Button radius="xl" style={{ flex: 1 }}>
              Book now
            </Button>
          </Link>
        </Group>
      </Card.Section>
    </Card>
  ) : null;
}