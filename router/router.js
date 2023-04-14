const router = require('express').Router()
const UserController = require('../controller/createUser.controller')


router.post('/created',UserController.createUserController);
router.put('/update/:id',UserController.updateUserController);
router.get('/getAll',UserController.getAllUserController);
router.post('/singleUser',UserController.getSingle)
router.delete('/deleteUser/:id',UserController.userDeleteController);
router.post('/bluck',UserController.bluckuser)

module.exports = router;