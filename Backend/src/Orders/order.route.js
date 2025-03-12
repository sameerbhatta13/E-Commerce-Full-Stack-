const express = require('express')
const { postOrder, getOrderItems } = require('./order.controller')
const { authmiddleware } = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/order', authmiddleware, postOrder)
router.get('/order', authmiddleware, getOrderItems)

module.exports = router