const { query } = require('express');
const joi = require('joi')

const userName = joi.string().pattern(/^[\S]{4,12}$/).required();
const password = joi.string().pattern(/^[\S]{6,15}$/).required();
exports.userCheck = {
    body: {
        userName,
        password,
    }
}
//項目查詢規則
const category = joi.string().required()
const page = joi.number().integer().required()
const size = joi.number().integer().required()
exports.findProjectCheck = {
    query: {
        category,
        page,
        size,
    }
}



//項目查詢規則
const title = joi.string()
const price = joi.number()
const id = joi.number().integer().required()
exports.updateProjectCheck = {
    query: {
        title,
        price,
        id,
    }
}



exports.deleteProjectCheck = {
    query: {
        id,
    }
}