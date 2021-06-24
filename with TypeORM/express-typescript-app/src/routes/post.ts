import { Router } from 'express';
import { PostController}  from '../app/controllers/PostController';
import { checkJWT } from '../app/middleware/checkJWT';
import { checkIsAuthor } from '../app/middleware/checkIsAuthor';
import { checkIsUser } from '../app/middleware/checkIsUser';

const router = Router();

// Get all users
router.get('/', PostController.listAll)
router.get('/:id', PostController.getOneById)
router.post('/', [checkJWT] ,PostController.newPost)
router.put('/:id', [checkJWT, checkIsAuthor], PostController.editPost);
router.delete('/:id', [checkJWT, checkIsAuthor], PostController.deletePost);


export default router;
