import prisma from '../config/database.js';
import { SHOW_DELETED_OPTIONS, POST_STATUS } from '../constants.js';

export const getAllPosts = async (showDeleted?: string, status?: string, category?: number) => {
    return await prisma.post.findMany({
        where: {
            category_id: category || undefined, // Belirtilen kategoriye göre filtrele
            deleted_at: showDeleted === SHOW_DELETED_OPTIONS.ONLY_DELETED
                ? { not: null } // Silinmiş kayıtları getir
                : showDeleted !== SHOW_DELETED_OPTIONS.ALL
                ? null // Silinmemiş kayıtları getir
                : undefined,
            published_at: status === POST_STATUS.PUBLISHED
                ? { not: null } // Yayınlanmış postları getir
                : status === POST_STATUS.DRAFT
                ? null // Taslak postları getir
                : undefined,
        },
    });
};

export const getPostById = async (id: number) => {
    return await prisma.post.findUnique({
        where: { id, deleted_at: null },
    });
};

export const createPost = async (data: { category_id: number, title: string, content: string, published_at?: Date }) => {
    return await prisma.post.create({
        data,
    });
};

export const updatePost = async (id: number, data: { title?: string, content?: string, published_at?: Date }) => {
    return await prisma.post.update({
        where: { id },
        data,
    });
};

export const deletePost = async (id: number) => {
    return await prisma.post.update({
        where: { id },
        data: { deleted_at: new Date() },
    });
};
