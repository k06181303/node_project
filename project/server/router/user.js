const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')
const expressJoi = require('@escook/express-joi')
const { userCheck } = require('../utils/check')
/**
 * 用戶註冊接口
 */

router.post('/register', expressJoi(userCheck), userController.registerController)
/**
 * 用戶登入接口
 */

router.post('/login', expressJoi(userCheck), userController.loginController)
/**
 * 用戶信息查詢
 */



router.get('/userInfo', userController.userInfoController)


module.exports = router
