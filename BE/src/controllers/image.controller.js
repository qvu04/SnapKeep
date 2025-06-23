import { responseSuccess } from "../common/helpers/response.helper";
import { imageService } from "../services/image.service";

export const imageController = {
    findAll: async function (req, res, next) {
        try {
            const result = await imageService.findAll(req);
            const response = responseSuccess(result, `Get all images successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    findOne: async function (req, res, next) {
        try {
            const result = await imageService.findOne(req);
            const response = responseSuccess(result, `Get image #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    findById: async function (req, res, next) {
        try {
            const result = await imageService.findById(req);
            const response = responseSuccess(result, `Get image #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
    findByIdSaveImage: async function (req, res, next) {
        try {
            const result = await imageService.findByIdSaveImage(req);
            const response = responseSuccess(result, `Get save image by id successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
};