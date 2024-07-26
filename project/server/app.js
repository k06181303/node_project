const express = require('express');
const app = express();
/**
 * 解析post請求的post數據
 */
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * 跨域請求配置
 */
const cors = require('cors')
app.use(cors())

/**
 * 解析token校驗是否正確，那些接口需要校驗
 */
const expressJwt = require('express-jwt')
const { jwtSecretKey } = require('./config/jwtSecretKey');

app.use(expressJwt({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless(
    { path: ['/api/v1/user/register', '/api/v1/user/login'] }))




/**
 * 用戶相關的接口
 */
const userRouter = require('./router/user')
app.use('/api/v1/user', userRouter)


/**
 * 項目相關的接口
 */
const projectRouter = require('./router/project')
app.use('/api/v1/project', projectRouter)


/**
 * 錯誤中間
 */
const joi = require('joi')
app.use((err, req, res, next) => {
    //jo表單的用戶信息認證失敗
    if (err instanceof joi.ValidationError) {
        return res.send({
            code: 1,
            message: err.message,
        })
    }
    if (err.name === 'UnauthorizedError') {
        return res.send({ code: 1, message: '身分認證失敗' })
    }
    //其他的錯誤
    res.send({
        code: 1,
        message: err.message,
    })
})

app.listen(3000, () => {
    console.log('伺服器啟動在: http://127.0.0.1:3000')
})