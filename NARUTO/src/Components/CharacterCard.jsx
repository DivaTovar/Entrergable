import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/config';

const CharacterCard = ({ character }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavorite = async (e) => {
    e.stopPropagation();


    const datos = {
      name: character.name,
      birthday: character.personal?.birthdate || 'Unknown',
      dateAdded: new Date().toISOString()
    };

    try {
      const auxDOC = doc(db, 'favorites', character.id.toString());
      await setDoc(auxDOC, datos);
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const imageUrl = Array.isArray(character.images) && character.images.length > 0 
    ? character.images[0] 
    : 'https://via.placeholder.com/200x300';

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      <CardMedia
        component="img"
        sx={{ 
          width: { xs: 120, sm: 150, md: 200 },
          objectFit: 'cover'
        }}
        image={imageUrl}
        alt={character.name}
        onClick={() => navigate(`/character/${character.id}`)}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Birthday: {character.personal?.birthdate || 'Unknown'}
          </Typography>
          {character.personal?.clan && (
            <Typography variant="body2" color="text.secondary">
              Clan: {character.personal.clan}
            </Typography>
          )}
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleFavorite}>
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default CharacterCard;