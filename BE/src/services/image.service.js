import prisma from "../common/prisma/init.prisma";

export const imageService = {
    findAll: async function (req) {
        const images = await prisma.images.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                desc: true,
                url: true,
                createdAt: true,
                user_id: true,
            }
        });

        return images;
    },

    findOne: async function (req) {
        const { title } = req.query;
        const images = await prisma.images.findMany({
            where: {
                isDeleted: false,
                title: {
                    contains: title,
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                desc: true,
                url: true,
                createdAt: true,
                user_id: true,
            }
        });

        return images;
    },
    findById: async function (req) {
        const { id } = req.params;
        const idNumber = Number(id);
        const imagesByUser = await prisma.images.findUnique({
            where: {
                id: idNumber,
            },
            select: {
                id: true,
                title: true,
                desc: true,
                url: true,
                createdAt: true,
                Users: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
        if (!imagesByUser) {
            throw new Error("Không có ảnh này!");
        }
        return imagesByUser;
    },
    findByIdSaveImage: async function (req) {
        const { imageId, userId } = req.query;
        const imageIdNum = Number(imageId);
        const userIdNum = Number(userId);
        if (isNaN(imageIdNum) || isNaN(userIdNum)) {
            throw new Error("Sai định dạng ảnh!");
        }
        const imageSaveByImage = await prisma.saved_images.findFirst({
            where: {
                image_id: imageIdNum,
                user_id: userIdNum,
                isDeleted: false,
            },
        })
        return {
            isSaved: imageSaveByImage ? true : false,
            data: imageSaveByImage,
        }
    },
};