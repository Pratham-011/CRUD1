import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, List, ListItem, ListItemText,
  CircularProgress, Button, TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/items', {
        headers: {
          Authorization: ` ${auth.token}` // Include the token in the request header
        }
      });
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.user && auth.user.role === 1) {
      fetchItems();
    }
  }, [auth.user]);

  const handleOpen = (item = null) => {
    setSelectedItem(item);
    setNewItem(item ? { name: item.name, description: item.description } : { name: '', description: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (selectedItem) {
        await axios.put(`http://localhost:8080/api/v1/items/${selectedItem._id}`, newItem, {
          headers: {
            Authorization: ` ${auth.token}`
          }
        });
      } else {
        await axios.post('http://localhost:8080/api/v1/items', newItem, {
          headers: {
            Authorization: ` ${auth.token}`
          }
        });
      }
      setOpen(false);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/items/${itemId}`, {
        headers: {
          Authorization: ` ${auth.token}`
        }
      });
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAddComment = async (itemId, comment) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/items/${itemId}/comment`, { comment }, {
        headers: {
          Authorization: ` ${auth.token}`
        }
      });
      fetchItems();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddRating = async (itemId, rating) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/items/${itemId}/rating`, { rating }, {
        headers: {
          Authorization: ` ${auth.token}`
        }
      });
      fetchItems();
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Item
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {items.map(item => (
            <ListItem key={item._id}>
              <ListItemText primary={item.name} secondary={item.description} />
              <Button onClick={() => handleOpen(item)}>Edit</Button>
              <Button onClick={() => handleDelete(item._id)}>Delete</Button>
              <Button onClick={() => handleAddComment(item._id, 'New Comment')}>Add Comment</Button>
              <Button onClick={() => handleAddRating(item._id, 5)}>Add Rating</Button> 
            </ListItem>
          ))}
        </List>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedItem ? 'Update the item details' : 'Enter the details for the new item'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
