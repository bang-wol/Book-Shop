const express = require('express');
const router=express.Router();
const { addLikes, removeLikes } = require('../controller/LikeController');

router.use(express.json());

router.post('/:id', addLikes);
router.delete('/:id', removeLikes);

module.exports=router;
