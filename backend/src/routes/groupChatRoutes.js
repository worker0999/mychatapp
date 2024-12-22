
const express = require('express');
const router = express.Router();
const { createGroup, addUser, sendMessage, getMessages } = require('../controllers/groupChatController');

router.post('/create', createGroup);
router.post('/add-user', addUser);
router.post('/:groupId/send-message', sendMessage);
router.get('/:groupId/messages', getMessages);

module.exports = router;
