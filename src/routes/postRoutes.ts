import { Router } from "express";
import { addPost, editPost, getPost, listPosts, removePost } from "../controllers/postController.js";
const router = Router();

router.get('/', listPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.put('/:id', editPost);
router.delete('/:id', removePost)

export default router;
