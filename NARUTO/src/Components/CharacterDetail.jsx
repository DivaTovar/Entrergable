import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  CircularProgress, 
  Alert,
  Divider,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Collapse,
  IconButton
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showJutsu, setShowJutsu] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dattebayo-api.onrender.com/characters/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch character details');
        }
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

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

  if (!character) {
    return (
      <Box m={2}>
        <Alert severity="info">Character not found.</Alert>
      </Box>
    );
  }

  const renderSection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;
    
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom color="primary.main">
          {title}
        </Typography>
        {content}
        <Divider sx={{ mt: 2 }} />
      </Box>
    );
  };

  const renderList = (items) => {
    if (!items || items.length === 0) return null;
    
    return (
      <List dense>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    );
  };

  const renderJutsuSection = () => {
    if (!character.jutsu || character.jutsu.length === 0) return null;

    return (
      <Box sx={{ mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2 
          }}
        >
          <Button
            onClick={() => setShowJutsu(!showJutsu)}
            variant="contained"
            endIcon={showJutsu ? <ExpandLess /> : <ExpandMore />}
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              py: 1.5
            }}
          >
            <Typography variant="h6" sx={{ color: 'white' }}>
              Jutsu ({character.jutsu.length})
            </Typography>
          </Button>
        </Box>
        
        <Collapse in={showJutsu} timeout="auto">
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              maxHeight: '400px', 
              overflow: 'auto',
              backgroundColor: 'background.paper',
              borderRadius: 1
            }}
          >
            <List dense>
              {character.jutsu.map((jutsu, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={jutsu} 
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '1rem',
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Collapse>
        <Divider sx={{ mt: 2 }} />
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        {/* Header */}
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center"
          sx={{ 
            mb: 4,
            color: 'primary.main',
            fontWeight: 'bold'
          }}
        >
          {character.name}
        </Typography>

        {/* Images Carousel */}
        {character.images && character.images.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Carousel
              animation="slide"
              autoPlay={false}
              indicators={true}
              navButtonsAlwaysVisible={true}
              sx={{
                maxWidth: '100%',
                margin: '0 auto',
                '& .MuiIconButton-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: 'white'
                }
              }}
            >
              {character.images.map((image, i) => (
                <Box 
                  key={i} 
                  sx={{ 
                    height: { xs: 300, sm: 400, md: 500 },
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'black'
                  }}
                >
                  <img 
                    src={image} 
                    alt={`${character.name} ${i + 1}`} 
                    style={{ 
                      maxWidth: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
        )}

        {/* Personal Information */}
        {character.personal && renderSection(
          "Personal Information",
          <Grid container spacing={2}>
            {Object.entries(character.personal).map(([key, value]) => {
              if (typeof value === 'object') return null;
              return (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Typography>
                  <Typography>{value}</Typography>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Nature Types */}
        {character.natureType && renderSection(
          "Nature Types",
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {character.natureType.map((nature, index) => (
              <Chip 
                key={index}
                label={nature}
                color="primary"
                variant="outlined"
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        )}

        {/* Jutsu Section with Collapsible Content */}
        {renderJutsuSection()}

        {/* Family */}
        {character.family && renderSection(
          "Family",
          <Grid container spacing={2}>
            {Object.entries(character.family).map(([relation, name]) => (
              <Grid item xs={12} sm={6} key={relation}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  {relation.charAt(0).toUpperCase() + relation.slice(1)}:
                </Typography>
                <Typography>{name}</Typography>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Tools */}
        {character.tools && renderSection(
          "Tools",
          renderList(character.tools)
        )}

        {/* Voice Actors */}
        {character.voiceActors && renderSection(
          "Voice Actors",
          <Grid container spacing={2}>
            {Object.entries(character.voiceActors).map(([language, actors]) => (
              <Grid item xs={12} sm={6} key={language}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}:
                </Typography>
                {Array.isArray(actors) ? (
                  actors.map((actor, index) => (
                    <Typography key={index}>{actor}</Typography>
                  ))
                ) : (
                  <Typography>{actors}</Typography>
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default CharacterDetail;