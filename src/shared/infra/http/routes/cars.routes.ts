import multer from 'multer';
import uploadConfig from '@config/upload';
import { Router } from 'express';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationCarController } from '@modules/cars/useCases/createCarSpeficification/CreateSpecificationCarController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { DeleteCarImageController } from '@modules/cars/useCases/deleteCarImage/DeleteCarImageController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationCarController();
const uploadCarImageController = new UploadCarImagesController();
const deleteCarsImageController = new DeleteCarImageController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

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
