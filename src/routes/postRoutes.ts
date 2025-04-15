import { Router } from "express";
import { addPost, editPost, getPost, listPosts, removePost, addPostTag, removePostTag } from "../controllers/postController.js";
const router = Router();

router.get('/', listPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.put('/:id', editPost);
router.delete('/:id', removePost);
router.post('/:id/tags', addPostTag);
router.delete('/:id/tags', removePostTag);

export default router;
