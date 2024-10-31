import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Favorites = () => {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    const getFavorites = async () => {
      const querySnapshot = await getDocs(collection(db, 'favorites'));
      const favoritesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFavorites(favoritesData);
    };

    getFavorites();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Favorite Characters</Typography>
      <List>
        {favorites.map((favorite) => (
          <ListItem key={favorite.id}>
            <ListItemText
              primary={favorite.name}
              secondary={`Birthday: ${favorite.birthday}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Favorites;