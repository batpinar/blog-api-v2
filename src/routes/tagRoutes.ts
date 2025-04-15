import { Router } from "express";
import { addTag, editTag, getTag, listTags, removeTag } from "../controllers/tagController.js";
const router = Router();

router.get('/', listTags);
router.get('/:id', getTag);
router.post('/', addTag);
router.put('/:id', editTag);
router.delete('/:id', removeTag)

export default router;
