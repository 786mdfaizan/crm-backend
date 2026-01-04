// backend/src/routes/auth.routes.js
const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { User } = require('../models/User');

const router = Router();

router.post('/login', login);



module.exports = router;