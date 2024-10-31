import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Box, Alert, Grid } from '@mui/material';
import CharacterCard from '../Components/CharacterCard';

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dattebayo-api.onrender.com/characters');
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        const charactersArray = Array.isArray(data) ? data : data.characters || [];
        setCharacters(charactersArray);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (characters.length === 0) {
    return (
      <Box m={2}>
        <Alert severity="info">No characters found.</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {characters.map(character => (
          <Grid item xs={12} sm={6} key={character.id}>
            <CharacterCard character={character} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;