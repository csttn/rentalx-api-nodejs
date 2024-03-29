import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { UserProfileController } from '@modules/accounts/useCases/userProfile/UserProfileController';
import { Router } from 'express';
import multer from 'multer';

const uploadAvatar = multer(uploadConfig);

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

userRoutes.post('/', createUserController.handle);

userRoutes.get('/profile', ensureAuthenticated, userProfileController.handle);

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { userRoutes };
