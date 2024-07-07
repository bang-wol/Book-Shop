const express = require('express')
const router=express.Router()
const {
    addToCart,
    getCartItems,
    removeCart,
}=require('../controller/CartController')

router.use(express.json());

router.post('/', addToCart)
router.get('/', getCartItems)
router.delete('/:id', removeCart)

module.exports=router
