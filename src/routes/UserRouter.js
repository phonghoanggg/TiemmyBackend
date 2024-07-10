const express = require("express")
const router = express.Router()
const { authMiddleWare , authUserMiddleWare} = require("../middleware/authMiddleware")
const UserController = require('../controller/UserController')

router.post('/sign-in', UserController.loginUser)
router.post('/sign-up', UserController.createUser)
router.post('/log-out', UserController.logoutUser)
router.put('/update-user/:id',authUserMiddleWare, UserController.updateUser)
router.delete('/delete-user/:id', authMiddleWare, UserController.deleteUser)
router.get('/getAll', UserController.getAllUser)
router.get('/get-details/:id',authUserMiddleWare, UserController.getDetailsUser)
router.post('/refresh-token', UserController.refreshToken)
// Tạo mới tài khoản
router.post('/create-user', UserController.createUserAdmin)

module.exports = router