const db = require('../config/db')
const jwt = require('jsonwebtoken')
const {jwtSecretKey} = require('../config/jwtSecretKey')
const bcrypt = require('bcryptjs')
/*
*註冊接口
*/


exports.registerController = (req, res) => {

    //用戶名以及密碼是否為空
    let { userName, password } = req.body
    if (!userName || !password) {
        return res.send({ code: 1, message: '用戶名以及密碼不能為空' })
    }

    const userSelectSql = 'select * from user where name=?'
    db.query(userSelectSql, userName, (err, results) => {
        if (err) {
            return res.send({ code: 1, message: err.message })
        }
        //判斷用戶是否在數據庫中存在
        if (results.length > 0) {
            return res.send({ code: 1, message: '該用戶已經存在' })
        }
    })

    // //用戶密碼加密
    const bcrypt = require('bcryptjs')
    const passwordB = bcrypt.hashSync(password, 10)
    //隨機生成用戶頭像
    const imgList = [
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/10.jpeg',
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/16.jpeg',
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/17.jpeg',
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',
        'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',
    ]
    // 随机生成1-10的整数
    const num = Math.floor(Math.random() * 10 + 1);



    //用戶信息插入數據庫
    const userInsertSql = 'insert into user (name, pwd, head_img) value (?, ?, ?)';
    db.query(userInsertSql, [userName, passwordB, imgList[num]],
        (err, results) => {
            if (err) {
                return res.send({ code: 1, message: err.message })
            }
            res.send({
                code: 0,
                message: '註冊成功'
            })

        })

}

/**
 * 用户登录
 */
exports.loginController = (req, res) => {
    
    let { userName, password } = req.body
    const userSelectSql = 'select * from user where name=?';
    db.query(userSelectSql, userName, (err, results) => {
        //錯誤日誌返回    
        if (err) {
            return res.send({ code: 1, message: err.message });
        }
        //帳號存在與否
        if (results.length === 0) {
            return res.send({ code: 1, message: '帳號不存在，請先註冊' });
        }
        //判斷密碼是否正確
        const compareState = bcrypt.compareSync(password, results[0].pwd);
        if (!compareState) {
            return res.send({ code: 1, message: '密碼錯誤' });
        }

         const user = { ...results[0], pwd: '' }
         const token = jwt.sign(user, jwtSecretKey, { expiresIn: '24h' });




         res.send({ code: 0, message: '登入成功' ,token: 'Bearer ' + token});
    });

};

/**
 * 用戶信息查詢
 */
exports.userInfoController = (req, res) => {
    //獲取token
    const token = req.headers.authorization

    /**
     * 解析token獲取用戶數據
     */
    const userInfo = jwt.verify(token.split('Bearer ')[1], jwtSecretKey)
    console.log(userInfo)
    
    res.send({
        code: 0,
        data: {
          name: userInfo.name,
          headImg: userInfo.head_img}
          })
          
    }