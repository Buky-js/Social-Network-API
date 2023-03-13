const router = require('express').Router();
const { getThoughts, getSingleThought } = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts);

// /api/users/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

module.exports = router;