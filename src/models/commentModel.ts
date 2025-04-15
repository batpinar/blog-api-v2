import prisma from '../config/database.js';

export const getAllComments = (commenter?: string, post?: number) => {
    return prisma.comment.findMany({
        where: {
            post_id: post || undefined,
            commenter_name: commenter || undefined,
        }
    });
}
export const getCommentById = (id: number) => {
    return prisma.comment.findUnique({
        where: { id },
    });
}

export const createComment = (data: { post_id: number, commenter_name: string, content: string }) => {
    return prisma.comment.create({
        data
    });
}


export const updateComment = (id: number, data: object) => {
    return prisma.comment.update({
        where: { id },
        data: data
    });
}

export const deleteComment = (id: number) => {
    return prisma.comment.delete({
        where: { id }
        });
}
