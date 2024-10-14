const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Route gửi mã xác nhận qua email
router.post('/forgot-password', AuthController.forgotPassword);

// Route xác minh mã code và đặt lại mật khẩu
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;
