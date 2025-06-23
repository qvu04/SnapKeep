import { responseSuccess } from "../common/helpers/response.helper";
import { commentService } from "../services/comment.service";

export const commentController = {
    createComment: async function (req, res, next) {
        try {
            const result = await commentService.createComment(req);
            const response = responseSuccess(result, `Create comment successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
    findById: async function (req, res, next) {
        try {
            const result = await commentService.findById(req);
            const response = responseSuccess(result, `Get comment #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
    remove: async function (req, res, next) {
        try {
            const result = await commentService.remove(req);
            const response = responseSuccess(result, `Remove comment #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    }
};