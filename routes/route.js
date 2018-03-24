const express=require('express');
const router=express.Router();
const path=require('path');
const users=require('../api/users.js');
const wallet=require('../api/wallet.js');
const bodyParser= require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post("/register",urlencodedParser,users.add);
router.get('/checkEmail/:email', users.getAll);
router.get('/checkUsername/:username', users.all);
router.post('/login',urlencodedParser,users.authenticate);

router.use(users.token);
router.get('/profile',users.profile);
router.get('/address',wallet.address);
router.get('/price',wallet.price);

module.exports=router;
