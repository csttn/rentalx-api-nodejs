import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ensureAdmin } from '@middlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

const listSpecificationsController = new ListSpecificationsController();

// // middleware esta inserido em todas as rottas de especificações
// specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get('/', listSpecificationsController.handle);

export { specificationsRoutes };
