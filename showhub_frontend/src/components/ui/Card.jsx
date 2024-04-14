import { Card, Image, Text, Group, Badge, Center, Button } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './FeaturesCard.module.css';

const mockdata = [
  { label: 'Actor1', icon: IconUsers },
  { label: 'Actor2', icon: IconUsers },
  { label: 'Actor3', icon: IconUsers },
  { label: 'Actor4', icon: IconUsers },
];

export default function FeaturesCard() {
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://source.unsplash.com/q8P8YoR6erg" alt="Tesla Model S" />
      </Card.Section>
      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>Movie_title</Text>
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
          {features}
        </Group>
      </Card.Section>
      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              Price
            </Text>
          </div>
          <Link to={`/movies/${encodeURIComponent('Movie_title')}`}>
            <Button radius="xl" style={{ flex: 1 }}>
              Book now
            </Button>
          </Link>
        </Group>
      </Card.Section>
    </Card>
  );
}