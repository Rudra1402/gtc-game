const express = require('express');
const router = express.Router();
const userController = require('./controllers/user.controller');

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/verifyToken/:token', userController.verifyToken);
router.get('/userscore/:id', userController.getUserScore);
router.put('/updateScore', userController.updateScore);
router.get('/leaderboard', userController.getLeaderboard);

module.exports = router;