import express from 'express';
import { userController } from '../controllers/user.controller';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get('/saved-image', userController.getSavedImageByUserId);
userRouter.get('/saved-comment', userController.getSavedCommentByUserId);
userRouter.get('/user-info/:id', userController.getUserById);
export default userRouter;