const express = require('express');
const login = require('../controllers/login'); // Import controller

const router = express.Router();

router.post('/login_raw', login.login_raw);
router.post('/login_google', login.login_google);
router.post('/sign_up', login.sign_up);
module.exports = router;
