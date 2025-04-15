import { Request, Response } from "express";
import { getAllComments, getCommentById, createComment, updateComment, deleteComment } from "../models/commentModel.js";

export const listComments = async (req: Request, res: Response) => {
    try {
        const {commenter, post} = req.query
        const dbData = await getAllComments(commenter as string, Number(post));
        res.json(dbData);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}

export const getComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const dbData = await getCommentById(Number(id));
        if (dbData) {
            res.json(dbData);
        } else {
            res.status(404).json({ message: "not_found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}

export const addComment = async (req: Request, res: Response) => {
    try {
        const newData =  await createComment(req.body)
        res.status(202).json(newData);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}

export const editComment = async (req:Request, res:Response) =>{
    const { id } = req.params;
    try {
        const updateData = await updateComment(Number(id), req.body)
        res.json(updateData)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}

export const removeComment = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const deleteData = await deleteComment(Number(id));
        res.json(deleteData)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}