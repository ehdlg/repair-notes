import { Router } from 'express';
import DeliveryNoteController from '../controllers';
import {
  validation,
  createRules,
  getAllRules,
  idParamRule,
  updateRules,
} from '../middlewares/validation';

const router = Router();

router.get('/', getAllRules, validation, DeliveryNoteController.getAll);

router.post('/', createRules, validation, DeliveryNoteController.create);

router.get('/pending', DeliveryNoteController.getPending);

router.get('/:id', idParamRule, validation, DeliveryNoteController.getOne);

router.delete('/:id', idParamRule, validation, DeliveryNoteController.delete);

router.patch('/:id', idParamRule, updateRules, validation, DeliveryNoteController.update);

export default router;
