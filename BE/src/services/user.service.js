import prisma from "../common/prisma/init.prisma";

export const userService = {
    getSavedImageByUserId: async function (req) {
        const { userId } = req.query;
        const savedImage = await prisma.saved_images.findMany({
            where: {
                user_id: +userId,
                isDeleted: false,
            },
            select: {
                Images: {
                    select: {
                        id: true,
                        title: true,
                        desc: true,
                        url: true,
                        createdAt: true,
                    }
                }
            }
        })
        return savedImage;
    },
    getSavedCommentByUserId: async function (req) {
        const { userId } = req.query;
        const savedComment = await prisma.comments.findMany({
            where: {
                user_id: +userId,
                isDeleted: false,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                Images: {
                    select: {
                        id: true,
                        title: true,
                        desc: true,
                        url: true,
                        createdAt: true,
                    }
                }
            }
        })
        return savedComment;
    },
    getUserById: async function (req) {
        const { id } = req.params;
        const idNum = Number(id);
        const userInfo = await prisma.users.findUnique({
            where: {
                id: idNum,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        })
        return userInfo;
    },
};