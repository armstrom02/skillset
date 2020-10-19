const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                   Router                                   */
/* -------------------------------------------------------------------------- */

router
    .route('/')
    .get(messageController.getAllMessage)
    .post(messageController.createMessage);

router
    .route('/:id')
    .get(messageController.getMessage)

module.exports = router;