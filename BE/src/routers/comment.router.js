import express from 'express';
import { commentController } from '../controllers/comment.controller';

const commentRouter = express.Router();

// Tạo route CRUD
commentRouter.post('/create-comment', commentController.createComment);
commentRouter.get('/:id', commentController.findById);
commentRouter.delete('/delete-comment/:id', commentController.remove);

export default commentRouter;