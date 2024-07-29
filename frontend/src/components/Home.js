// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, TextField, Button, Box } from '@mui/material';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/items');
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCommentChange = (event) => setComment(event.target.value);
  const handleRatingChange = (event) => setRating(event.target.value);

  const handleAddComment = async (itemId) => {
    try {
      const token = localStorage.getItem('token'); // Adjust if you store the token differently
      await axios.post(
        `http://localhost:8080/api/v1/items/${itemId}/comment`,
        { comment },
        {
          headers: {
            Authorization: ` ${token}`, // Include 'Bearer' prefix
          },
        }
      );
      setComment(''); // Clear the input field
      // Optionally refetch items or update state to reflect the new comment
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  const handleAddRating = async (itemId) => {
    try {
      const token = localStorage.getItem('token'); // Adjust if you store the token differently
      await axios.post(
        `http://localhost:8080/api/v1/items/${itemId}/rating`,
        { rating },
        {
          headers: {
            Authorization: ` ${token}`, // Include 'Bearer' prefix
          },
        }
      );
      setRating(''); // Clear the input field
      // Optionally refetch items or update state to reflect the new rating
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Items
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {items.map(item => (
            <ListItem key={item._id} button>
              <ListItemText primary={item.name} secondary={item.description}/>
              <Box>
                <TextField
                  label="Comment"
                  variant="outlined"
                  value={comment}
                  onChange={handleCommentChange}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddComment(item._id)}
                >
                  Add Comment
                </Button>
              </Box>
              <Box mt={2}>
                <TextField
                  label="Rating"
                  variant="outlined"
                  type="number"
                  value={rating}
                  onChange={handleRatingChange}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddRating(item._id)}
                >
                  Add Rating
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Home;
