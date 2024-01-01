import express from 'express';
import { findAll,create,destroy,findOne,update,upsert } from '../controllers/user.controller.js';
const router = express.Router();
router.get('/',findAll);
router.get('/getadusers',upsert);
router.get('/:login',findOne);
router.delete('/:id',destroy);
router.post('/',create);
router.post('/:id',update);
export {router};