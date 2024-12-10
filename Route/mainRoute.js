import express from 'express';
import mainController from '../Controller/mainController.js';




const router = express.Router();


router.get('/data' , mainController.getService.bind(mainController));


router.post('/data' , mainController.postService.bind(mainController))



export default router;
