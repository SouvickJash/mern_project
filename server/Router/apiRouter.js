const express=require('express');
const { createUser, getUser, editUser, updateUser, deleteUser, loginUser, forgetPassword, deleteUserMany } = require('../Controller/apiController');
const router=express.Router();

router.post('/create',createUser);
router.get('/get',getUser);
router.get('/edit/:id',editUser);
router.put('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);
router.delete('/DelteCheckBox',deleteUserMany);
router.post('/login',loginUser);
router.post('/password',forgetPassword)

module.exports=router

