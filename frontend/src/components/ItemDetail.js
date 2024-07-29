import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const { auth } = useAuth();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://backend-54cz.onrender.com/api/v1/items/${id}`, {
          headers: { Authorization: ` ${auth.token}` }
        });
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [id, auth.token]);

  const addComment = async () => {
    try {
      await axios.post(`https://backend-54cz.onrender.com/api/v1/items/${id}/comment`, { comment }, {
        headers: { Authorization: ` ${auth.token}` }
      });
      setComment('');
      // Optionally fetch the item again to show the new comment
    } catch (error) {
      console.error(error);
    }
  };

  const addRating = async () => {
    try {
      await axios.post(`https://backend-54cz.onrender.com/api/v1/items/${id}/rating`, { rating }, {
        headers: { Authorization: ` ${auth.token}` }
      });
      setRating('');
      // Optionally fetch the item again to show the new rating
    } catch (error) {
      console.error(error);
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4">{item.name}</Typography>
      <Typography variant="body1">{item.description}</Typography>
      <div>
        <TextField
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={addComment} variant="contained">
          Add Comment
        </Button>
      </div>
      <div>
        <TextField
          label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <Button onClick={addRating} variant="contained">
          Add Rating
        </Button>
      </div>
    </Container>
  );
};

export default ItemDetail;
