import { Prisma } from '@prisma/client';
import prisma from '../config/database.js';
import { SHOW_DELETED_OPTIONS, POST_STATUS } from '../constants.js';

export const getAllTags = () => {
    return prisma.tag.findMany();
};

export const getTagById = (id: number) => {
    return prisma.tag.findUnique({
        where: { id },
    });
};

export const createTag = (body: Prisma.TagCreateInput) => {
    return prisma.tag.create({
        data: body
    });
};

export const updateTag = (id: number, data: Prisma.TagUpdateInput) => {
    return prisma.tag.update({
        where: { id },
        data,
    });
};

export const deleteTag = (id: number) => {
    return prisma.tag.delete({
        where: { id }
    });
};
