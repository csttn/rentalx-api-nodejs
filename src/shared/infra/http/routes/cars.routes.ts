import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationCarController } from '@modules/cars/useCases/createCarSpeficification/CreateSpecificationCarController';
import { DeleteCarImageController } from '@modules/cars/useCases/deleteCarImage/DeleteCarImageController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { Router } from 'express';
import multer from 'multer';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationCarController();
const uploadCarImageController = new UploadCarImagesController();
const deleteCarsImageController = new DeleteCarImageController();

const upload = multer(uploadConfig);

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/', listAvailableCarController.handle);

carsRoutes.post('/specifications/:id', createCarSpecificationController.handle);
carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImageController.handle
);

carsRoutes.delete(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteCarsImageController.handle
);

export { carsRoutes };
