import React from 'react';
import Navbar from '../components/ui/Navbar';
import Card from '../components/ui/Card';

export default function Home() {
  // Define the number of cards you want to render
  const numberOfCards = 10;

  // Create an array to store the cards
  const cards = [];
  for (let i = 0; i < numberOfCards; i++) {
    cards.push(<Card key={i} />);
  }

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '5rem',
          padding: '5rem',
          width: '100%',
        }}
      >
        {cards}
      </div>
    </div>
  );
}