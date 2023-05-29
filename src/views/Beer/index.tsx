import { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article>
      <section>
        <header>
          <h1>{beer?.name}</h1>
        </header>
        <main>
        <Container>
      <Box my={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          {beer?.brewery_type}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Address: {beer?.address_1}, {beer?.city}, {beer?.state_province}, {beer?.postal_code}, {beer?.country}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Phone: {beer?.phone}
        </Typography>
        <Button variant="contained" color="primary" href={beer?.website_url}>
          Visit Website
        </Button>
      </Box>
    </Container>
        </main>
      </section>
    </article>
  );
};

export default Beer;
