import React, { useState, useEffect } from 'react';
import { Table, ScrollArea, Button } from '@mantine/core';

export default function TheatreTable({ moviename, city_selected }) {
  const [scrolled, setScrolled] = useState(false);
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    fetchTheatres();
  }, [moviename, city_selected]);

  const fetchTheatres = () => {
    fetch(`http://localhost:3001/movies/${encodeURIComponent(moviename)}/theatres/${encodeURIComponent(city_selected)}`)
      .then(response => response.json())
      .then(data => setTheatres(data))
      .catch(error => console.error('Error fetching theatres:', error));
  };

  const rows = theatres.map((theatre, index) => (
    <Table.Tr key={theatre.TheatreID}>
      <Table.Td>{theatre.TheatreName}</Table.Td>
      <Table.Td>{theatre.address}</Table.Td>
      <Table.Td>
        <Button>Select Now</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead style={{ position: 'sticky', top: 0, backgroundColor: scrolled ? '#f0f0f0' : 'transparent' }}>
          <Table.Tr>
            <Table.Th>Theatre Name</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
