import prisma from '../config/database.js';
import { SHOW_DELETED_OPTIONS } from '../constants.js';

/**
 * Tüm kategorileri getirir, silinmişleri dahil etmek için filtre uygular
 */
export const getAllCategories = async (showDeleted: string) => {
    return await prisma.category.findMany({
        where:
            showDeleted === SHOW_DELETED_OPTIONS.ONLY_DELETED
                ? { deleted_at: { not: null } } // Sadece silinmişleri getir
                : showDeleted !== SHOW_DELETED_OPTIONS.ALL
                ? { deleted_at: null } // Sadece aktifleri getir
                : undefined, // Hepsini getir
    });
};

/**
 * Belirli bir ID'ye sahip kategoriyi getirir
 */
export const getCategoryById = async (id: number) => {
    return await prisma.category.findUnique({
        where: { id, deleted_at: null },
    });
};

/**
 * Yeni bir kategori oluşturur
 */
export const createCategory = async (data: { name: string }) => {
    return await prisma.category.create({
        data,
    });
};

/**
 * Belirli bir kategoriyi günceller
 */
export const updateCategory = async (id: number, data: { name: string }) => {
    return await prisma.category.update({
        where: { id },
        data,
    });
};

/**
 * Belirli bir kategoriyi soft delete olarak işaretler
 */
export const deleteCategory = async (id: number) => {
    return await prisma.category.update({
        where: { id },
        data: { deleted_at: new Date() },
    });
};
