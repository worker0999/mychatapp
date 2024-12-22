
const express = require('express');
const router = express.Router();
const { viewProfile, blockUser } = require('../controllers/userProfileController');

router.get('/:userId', viewProfile);
router.post('/:userId/block', blockUser);

module.exports = router;
