import express from 'express';
import { upload } from '../controllers/file.controller.js';
const router = express.Router();
router.post('/',upload);
export {router};