import { Router } from 'express';
import {
  searchRecipesController,
  getRecipeByIdController,
  createOwnRecipeController,
  getOwnRecipesController,
  addToFavoritesController,
  removeFromFavoritesController,
  getFavoriteRecipesController,
  deleteOwnRecipeController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { recipeSchema } from '../validation/recipe.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { parseIngredients } from '../middlewares/parseIngredients.js';
const router = Router();

router.get('/', ctrlWrapper(searchRecipesController));

router.get(
  '/favorite',
  authenticate,
  ctrlWrapper(getFavoriteRecipesController),
);

router.get('/own', authenticate, ctrlWrapper(getOwnRecipesController));

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.post(
  '/',
  authenticate,
  upload.single('photo'),
  parseIngredients,
  validateBody(recipeSchema),
  ctrlWrapper(createOwnRecipeController),
);

router.post(
  '/:recipeId/favorite',
  authenticate,
  isValidId,
  ctrlWrapper(addToFavoritesController),
);

router.delete(
  '/:recipeId/favorite',
  authenticate,
  isValidId,
  ctrlWrapper(removeFromFavoritesController),
);

router.delete(
  '/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteOwnRecipeController),
);

export default router;
