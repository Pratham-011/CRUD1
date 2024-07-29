const express = require('express');
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  addComment,
  addRating
} = require('../controllers/itemController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get( getItems).post(protect, admin, createItem);
router.route('/:id').get( getItemById).put(protect, admin, updateItem).delete(protect, admin, deleteItem);
router.route('/:id/comment').post(protect, addComment);
router.route('/:id/rating').post(protect, addRating);

module.exports = router;
