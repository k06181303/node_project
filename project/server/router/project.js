const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const { findProjectCheck, updateProjectCheck, deleteProjectCheck } = require('../utils/check')
const projectController = require('../controllers/projectController')

//項目查詢接口
router.get
    ('/find', expressJoi(findProjectCheck), projectController.listVideo)

//項目修改接口
router.get
    ('/update', expressJoi(updateProjectCheck), projectController.updateVideoById)

//項目DELETE接口
router.get
    ('/delete', expressJoi(deleteProjectCheck), projectController.deleteVideoById)

module.exports = router