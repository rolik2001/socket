import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import Deposit from '../models/deposit.js';
import Withdraw from '../models/withdraw.js';
import BlockIo from 'block_io';
let version = 2;
let block_io = new BlockIo('1735-54e8-8c3e-0243', '20102010', version);

import WAValidator from 'wallet-address-validator';
import {
    refer
} from '../controllers/refer.js';
import {
    start
} from '../controllers/start.js';
import {
    adress
} from '../controllers/login.js'
import {
    support
} from '../controllers/support.js'



/* GET home page. */
router.get('/', start);
/* Login by adress. */
router.post('/users', adress);
/*Referal*/
router.get('//referal=:id', refer);
/*Referal*/
router.get('/referal=:id', refer);
/* Support */
router.post('/support', support);


module.exports = router;
