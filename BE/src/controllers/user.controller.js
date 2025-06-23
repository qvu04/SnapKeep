import { responseSuccess } from "../common/helpers/response.helper";
import { userService } from "../services/user.service";

export const userController = {
    getSavedImageByUserId: async function (req, res, next) {
        try {
            const result = await userService.getSavedImageByUserId(req);
            const response = responseSuccess(result, `Get user #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
    getSavedCommentByUserId: async function (req, res, next) {
        try {
            const result = await userService.getSavedCommentByUserId(req);
            const response = responseSuccess(result, `Get user #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    getUserById: async function (req, res, next) {
        try {
            const result = await userService.getUserById(req);
            const response = responseSuccess(result, `Get user #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
};