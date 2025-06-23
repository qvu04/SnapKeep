import prisma from "../common/prisma/init.prisma";

export const commentService = {
    createComment: async function (req) {
        const { user_id, image_id, content } = req.body;
        const newComment = await prisma.comments.create({
            data: {
                user_id: user_id,
                image_id: image_id,
                content: content
            }
        })
        return newComment;
    },
    findById: async function (req) {
        const { id } = req.params;
        const idNumber = Number(id);
        const commentByImage = await prisma.comments.findUnique({
            where: {
                id: idNumber,
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
                    }
                }
            }
        })
        return commentByImage;
    },
    remove: async function (req) {
        const { id } = req.params;
        const idNum = Number(id);
        const deleteComment = await prisma.comments.delete({
            where: {
                id: idNum,
            },
        })
        return deleteComment;
    },
};