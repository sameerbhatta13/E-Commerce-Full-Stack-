const express = require('express')
const { postOrder, getOrderItems, getAllUserOrders } = require('./order.controller')
const { authmiddleware, adminMiddleware } = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/order', authmiddleware, postOrder)
router.get('/order', authmiddleware, getOrderItems)
router.get('/allorder', authmiddleware, adminMiddleware, getAllUserOrders)

module.exports = router