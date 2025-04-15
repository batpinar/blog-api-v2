import prisma from '../config/database.js';
import { SHOW_DELETED_OPTIONS, POST_STATUS } from '../constants.js';

export const getAllPosts = (showDeleted?: string, status?: string, category?: number, tags?: string) => {
    const queryList: any[] = []

    if (category) {
        queryList.push({ category_id: category }) 
    }

    if (showDeleted === SHOW_DELETED_OPTIONS.ONLY_DELETED) {
        queryList.push({ deleted_at: { not: null } });
    } else if (showDeleted !== SHOW_DELETED_OPTIONS.ALL) {
        queryList.push({ deleted_at: null });
    }

    if (status === POST_STATUS.PUBLISHED) {
        queryList.push({ published_at: { not: null } });
    } else if (status === POST_STATUS.DRAFT) {
        queryList.push({ published_at: null });
    }

    if (tags) {
        const tagIds = tags.split(',').map(id => Number(id));
        queryList.push({ tags: { some: { tag_id: { in: tagIds } } } });
    }
    return prisma.post.findMany({
        where:{
            AND: queryList
        }
    });
};

export const getPostById =  (id: number) => {
    return  prisma.post.findUnique({
        where: { id, deleted_at: null },
    });
};

export const createPost =  (data: { category_id: number, title: string, content: string, published_at?: Date }) => {
    return  prisma.post.create({
        data,
    });
};

export const updatePost =  (id: number, data: { title?: string, content?: string, published_at?: Date }) => {
    return  prisma.post.update({
        where: { id },
        data,
    });
};

export const deletePost =  (id: number) => {
    return  prisma.post.update({
        where: { id },
        data: { deleted_at: new Date() }
    });
};
