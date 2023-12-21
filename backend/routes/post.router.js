import express from 'express';
import { findAll,create,destroy,findOne,update } from '../controllers/post.controller.js';
const router = express.Router();
router.get('/',findAll);
router.get('/:id',findOne);
router.delete('/:id',destroy);
router.post('/',create);
router.put('/:id',update);
export {router};