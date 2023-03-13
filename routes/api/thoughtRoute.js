const router = require('express').Router();
const { getThoughts } = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts);


module.exports = router;