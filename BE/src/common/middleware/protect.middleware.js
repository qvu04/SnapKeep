import tokenService from "../../services/token.service";
import prisma from "../prisma/init.prisma";
const protect = async (req, res, next) => {
    req.isProtect = true;
    // kiểm tra token 
    // token hợp lệ --> cho đi tiếp : next()
    // token không hợp lệ --> trả lỗi
    const authHeader = req.headers?.authorization || "";
    const [type, token] = authHeader.split(" ");
    if (!token) {
        throw new UnauthorizedException("Token không hợp lệ!")
    }
    if (type !== `Bearer`) {
        throw new UnauthorizedException("Kiểu token không hợp lệ!");
    }
    // kiểm tra token
    // nếu chạy qua là token hợp lệ
    // nếu có lỗi thì tự động throw lỗi(jwt.verify), mình không cần throw lỗi
    const decode = tokenService.verifyAccessToken(token);

    const user = await prisma.users.findUnique({
        where: {
            id: decode.userId,
        },
        include: {
            Roles: true,
        }
    })
    req.user = user;
    console.log({
        token,
        type,
        decode,
        user,
    });
    next();
}
export default protect