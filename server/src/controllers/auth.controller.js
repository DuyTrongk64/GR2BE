import prisma from '../service/prisma.js';
import { comparePassword, hashPasswordFunction } from '../utils/hash.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

const authController = {
    login: async (req, res, next) => {
        
        const { email, password } = req.body;
        console.log(req.body)

        try {
            const findUser = await prisma.user.findUnique({
                where: { email: email },
            })
            
            if (!findUser) {
                return res
                    .status(StatusCodes.UNAUTHORIZED)
                    .json({ message: 'User not found' });
            };            
            
            const isPasswordMatched = await comparePassword(
                password,
                findUser.password,
            );

            if (!isPasswordMatched) {
                return res
                    .status(StatusCodes.UNAUTHORIZED)
                    .json({ message: 'Password is wrong' });
            }

            return res.status(StatusCodes.OK).json({
                ip: findUser.user_id,
                type: findUser.user_type,
                message: "Login successfully"
            })
        }
        catch (error) {
            next(error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }
}
export default authController;