const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');

// 🔹 Send OTP
router.post('/customerLogin', LoginController.customerLogin);
// 🔹 Verify OTP
router.post('/verifyOtp', LoginController.verifyOtp);
router.post('/register-customer', LoginController.registerCustomer);
router.post("/forgot-password", LoginController.forgotPassword);
router.post("/reset-password",LoginController.resetPassword);

module.exports = router;