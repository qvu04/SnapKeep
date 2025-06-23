import express from 'express';
import { imageController } from '../controllers/image.controller';
import protect from '../common/middleware/protect.middleware';

const imageRouter = express.Router();

// Tạo route CRUD
imageRouter.get('/saved-image', imageController.findByIdSaveImage);
imageRouter.get('/', protect, imageController.findAll);
imageRouter.get('/search', imageController.findOne);
imageRouter.get('/:id', imageController.findById);
export default imageRouter;