import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CharacterDetail from './Components/CharacterDetail';
import Favorites from './Components/Favorites';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'white' 
            }}
          >
            NARUTO
          </Typography>
          <Button 
            color="inherit" 
            component={Link} 
            to="/favorites"
          >
            FAVORITOS
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;