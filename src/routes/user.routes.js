const { Router } = require('express');
const { protect, adminOnly } = require('../middleware/auth.middleware');
const { createConsultant, getAllConsultants } = require('../controllers/user.controller');

const router = Router();

router.use(protect, adminOnly);

router.get('/', getAllConsultants);
router.post('/', createConsultant);

module.exports = router;