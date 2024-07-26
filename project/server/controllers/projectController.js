const db = require('../config/db')

/**
 * 項目查詢
 */
exports.listVideo = (req, res) => {
    //獲取前端的參數
    let { category, page, size } = req.query
    page = (page - 1) * size
    //項目查詢SQL
    const pageSql = 'select * from video where del=0 and category=? order by id limit ?,?'

    //查詢項目總數的sql
    const totalSql = 'select count(*) as total from video where del=0 and category=?'

    db.query(pageSql, [category, Number(page), Number(size)], (err, resPage) => {
        if (err) {
            return res.send({ code: 1, message: err.message })
        }
        db.query(totalSql, category, (err, resTotal) => {
            if (err) {
                return res.send({ code: 1, message: err.message })
            }
            res.send({
                code: 0,
                data: {
                    list: resPage,
                    total: resTotal,
                }
            })
        })





    })

}
/**
 *項目修改接口
 */
exports.updateVideoById = (req, res) => {
    let { title, price, id } = req.query
    let sql = 'update video set '
    let arr = []
    //同時修改標題和價格
    if (title && price) {
        sql = sql + 'title=?,price=? where id=?'
        arr = [title, Number(price), Number(id)]
    } else if (title) {
        //單獨修改標題
        sql = sql + 'title=? where id=?'
        arr = [title, Number(id)]
    } else if (price) {
        //單獨修改價格
        sql = sql + 'price=? where id=?'
        arr = [price, Number(id)]
    }

    db.query(sql, arr, (err, results) => {
        if (err) {
            return res.send({ code: 1, message: err.message })
        }
        res.send({ code: 0, message: '修改成功' })
    })
}
/**
 *delete項目接口
 */
exports.deleteVideoById = (req, res) => {
    let { id } = req.query

    let sql = 'update video set del=1 where id=?'
    db.query(sql, id, (err, results) => {
        if (err) {
            return res.send({ code: 1, message: err.message })
        }
        res.send({ code: 0, message: '刪除成功' })
    })
}