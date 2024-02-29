const express = require('express');
const { loginUser, getUsers, registerUser } = require('../lib/handler/userController');
// const Users = require('../models/userSchema');

const router = express.Router();

// router.get('/', (req, res) => {
//     res.status(200).json({ ok: true });
// });

router.get('/', getUsers);

router.post('/login', loginUser);

router.post('/register', registerUser);

module.exports = router;
