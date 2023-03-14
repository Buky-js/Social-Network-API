const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    createFriend,
    deleteUser, deleteFriend, updateUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);







module.exports = router;