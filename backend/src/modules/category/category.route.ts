import express from 'express';
import requireUser from '../../middleware/requireUser';
import { newCategoryHandler, getCategoriesHandler, getCategoryHandler, editCategoryHandler, deleteCategoryHandler } from './category.controller';

const router = express.Router();

router.post('/', requireUser, newCategoryHandler);
router.get('/', requireUser, getCategoriesHandler);
router.get('/:id', requireUser, getCategoryHandler);
router.patch('/:id', requireUser, editCategoryHandler);
router.delete('/:id', requireUser, deleteCategoryHandler);

export default router;