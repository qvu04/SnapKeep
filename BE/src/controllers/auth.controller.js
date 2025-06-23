import { responseSuccess } from "../common/helpers/response.helper";
import { authService } from "../services/auth.service";

export const authController = {
    login: async function (req, res, next) {
        try {
            const result = await authService.login(req);
            const response = responseSuccess(result, `Login auth successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
    register: async function (req, res, next) {
        try {
            const result = await authService.register(req);
            const response = responseSuccess(result, `Register auth successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
    findAll: async function (req, res, next) {
        try {
            const result = await authService.findAll(req);
            const response = responseSuccess(result, `Get all auths successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    findOne: async function (req, res, next) {
        try {
            const result = await authService.findOne(req);
            const response = responseSuccess(result, `Get auth #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
    refreshToken: async function (req, res, next) {
        try {
            const result = await authService.refreshToken(req);
            const response = responseSuccess(result, `Refresh Token successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    }
};