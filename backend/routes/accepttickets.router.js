import express from 'express';
import { findAll,create,destroy,findOne,update } from '../controllers/accepttickets.controller.js';
const router = express.Router();
router.get('/',findAll);
router.get('/:id',findOne);
router.delete('/',destroy);
router.post('/',create);
router.patch('/',update);

export {router};