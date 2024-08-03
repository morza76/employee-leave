const express = require('express');
const { registerUser } = require('../../controllers/userController');
const authController = require("../../controllers/authController");
const refreshTokenController = require("../../controllers/refreshTokenController");
const logoutController = require("../../controllers/logoutController");
const getMeController = require("../../controllers/getMeController");

const router = express.Router();


router.post('/register', registerUser);
router.post('/auth',authController.handleLogin );

router.post('/getMe',getMeController.handleGetMe );
router.post('/refresh',refreshTokenController.handleRefreshToken );
router.post('/logout',logoutController.handleLogout );

module.exports = router;