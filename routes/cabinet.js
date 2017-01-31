import express from 'express';
const router = express.Router();
import {cabinet} from "../controllers/cabinet.js"

router.get('/', cabinet);

module.exports = router
