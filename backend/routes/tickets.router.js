import express from 'express';
import { findAll,findCountTicketsWithStatus,create,destroy,findOne,update,updateStatus,findTicketByTworcaId,findTicketPosts,createTicketPost } from '../controllers/ticket.controller.js';
const router = express.Router();
router.get('/',findAll);
router.get('/:id/posts/page/:page',findTicketPosts);
router.post('/:id/post',createTicketPost);
router.get('/:id',findOne);
router.get('/tworca/:id/page/:page',findTicketByTworcaId);
router.delete('/:id',destroy);
router.post('/',create)
router.put('/:id',update);
router.post('/status',updateStatus);
router.get('/status/:status',findCountTicketsWithStatus);

export {router};