import { Request, Response } from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../models/postModel.js";
import { createPostTag, deletePostTag } from "../models/postTagModel.js";



export const listPosts = async (req: Request, res: Response) => {
    try {
        const { showDeleted, status, category, tags } = req.query
        const dbData = await getAllPosts(showDeleted as string, status as string, Number(category), tags as string);
        res.json(dbData);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const dbData = await getPostById(Number(id));
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

export const addPost = async (req: Request, res: Response) => {
    try {
        const newData = await createPost(req.body)
        res.status(202).json(newData);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}

export const editPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updateData = await updatePost(Number(id), req.body)
        res.json(updateData)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}

export const removePost = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deleteData = await deletePost(Number(id));
        res.json(deleteData)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}

export const addPostTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { tag_id } = req.body;
    try {
        const newPostTag = await createPostTag(Number(id), Number(tag_id));
        res.status(201).json(newPostTag);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}

export const removePostTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { tag_id } = req.body;
    try {
        const deletedPostTag = await deletePostTag(Number(id), Number(tag_id));
        res.status(200).json(deletedPostTag);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bir hata oldu" })
    }
}