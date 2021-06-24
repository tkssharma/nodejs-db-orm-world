import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import User from '../app/modules/entities/User';
import { checkJWT } from '../app/middleware/checkJWT';
import { checkIsAuthor } from '../app/middleware/checkIsAuthor';
import { checkIsUser } from '../app/middleware/checkIsUser';

const router = Router();

// Get all users
router.get('/', UserController.listAll)
router.get('/:id', UserController.getOneById)
router.post('/', UserController.newUser)
router.put('/:id', [checkJWT, checkIsUser], UserController.editUser);
router.delete('/:id', [checkJWT, checkIsUser], UserController.deleteUser);


export default router;
