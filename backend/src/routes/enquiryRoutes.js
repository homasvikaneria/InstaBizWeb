const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry
} = require('../controllers/enquiryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', createEnquiry);
router.get('/', authMiddleware, getEnquiries);
router.get('/:id', authMiddleware, getEnquiryById);
router.put('/:id', authMiddleware, updateEnquiry);
router.delete('/:id', authMiddleware, deleteEnquiry);

module.exports = router;
