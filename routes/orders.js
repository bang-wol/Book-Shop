const express = require('express');
const { orderItems, getOrderList, getOrderDetail } = require('../controller/OrderController');
const router=express.Router()

router.use(express.json());

router.post('/', orderItems);
router.get('/', getOrderList);
router.get('/:id', getOrderDetail);

module.exports=router
