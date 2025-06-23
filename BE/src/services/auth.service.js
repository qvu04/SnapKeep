import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import tokenService from "./token.service";
export const authService = {
    register: async function (req) {
        const { email, name, password } = req.body;
        const userExist = await prisma.users.findUnique({
            where: {
                email: email,
            }
        })
        if (userExist) {
            throw new Error("Tài khoản đã tồn tại! Vui lòng đăng nhập");
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const newUser = await prisma.users.create({
            data: {
                email: email,
                name: name,
                password: passwordHash
            }
        })
        delete newUser.password;
        return newUser;
    },
    login: async function (req) {
        const { email, password } = req.body;
        const userExist = await prisma.users.findUnique({
            where: {
                email: email,
            }
        })
        if (!userExist) {
            throw new Error("Chưa có tài khoản! Vui lòng đăng ký")
        }

        const isPassword = bcrypt.compareSync(password, userExist.password);
        if (!isPassword) {
            throw new Error("Mật khẩu không chính xác")
        }
        const token = tokenService.createToken(userExist.id);
        return {
            userExist,
            token,
        };
    },

    refreshToken: async function (req) {
        const { accessToken, refreshToken } = req.body;
        const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);
        const decodeAccessToken = tokenService.verifyAccessToken(accessToken, true);
        if (decodeRefreshToken.userId !== decodeAccessToken.userId) {
            throw new Error("Refresh token không thành công!");
        }
        const tokens = tokenService.createToken(decodeAccessToken.userId);
        return tokens;
    },
};