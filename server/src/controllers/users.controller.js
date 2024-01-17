import prisma from '../service/prisma.js';
import {hashPasswordFunction} from '../utils/hash.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

const userController = {
    getAll: async (req, res, next) => {
        try {
            const allUsers = await prisma.user.findMany({});
            return res.status(200).json(allUsers);
        } catch (error) {
            next(error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    },

    getByMSSV: async (req, res, next) => {
        const { mssv } = req.params;
        //const mssvInt = parseInt(mssv);
        
        if (isNaN(mssv) || mssv <= 0) {
            return res.status(400).json({ message: 'Invalid student ID' });
          }

        try {
            const user = await prisma.user.findUnique({
                where: { mssv: mssv },
            });
            return user
                ? res.status(200).json(user)
                : res.status(404).json({ message: `Student ${mssv} not found` });
        } catch (error) {
            next(error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    },

    create: async (req, res, next) => {
        const { email, full_name, mssv, password, major, gender, avatar_url, batch, phone_number, birthday} = req.body;
        const hashedPassword = await hashPasswordFunction(password);
        try {
            const createdUser = await prisma.user.create({
                data: {
                    email,
                    full_name,
                    mssv,
                    password: hashedPassword,
                    major,
                    gender,
                    avatar_url: avatar_url,
                    batch,
                    phone_number,
                    birthday,
                },
            });
            return res.status(201).json(createdUser);
        } catch (error) {
            next(error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    },

    delete: async (req, res, next) => {
        const { mssv } = req.params;
        //const mssvInt = parseInt(mssv);
    
        if (isNaN(mssv) || mssv <= 0) {
          return res.status(400).json({ message: 'Invalid student ID' });
        }
    
        try {
          const deletedUser = await prisma.user.delete({
            where: { mssv: mssv },
          });
    
          if (!deletedUser) {
            return res.status(404).json({ message: `Student ${mssv} not found` });
          }
    
          return res.status(204).json({
            message: `User ${mssv} deleted successfully`,
          });
        } catch (error) {
            next(error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
      },
    
      update: async (req, res, next) => {
        const { mssv } = req.params;
        const mssvInt = parseInt(mssv);
    
        if (isNaN(mssvInt) || mssvInt <= 0) {
          return res.status(400).json({ message: 'Invalid student ID' });
        }
    
        try {
          const updatedUser = await prisma.user.update({
            where: { mssv: mssvInt },
            data: req.body,
          });
    
          if (!updatedUser) {
            return res.status(404).json({ message: `Student ${mssv} not found` });
          }
    
          return res.status(200).json({
            message: `Student ${mssv} updated successfully`,
            updatedUser,
          });
        } catch (error) {
            next(error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
      },

      register: async (req, res, next) => {
        const{user_id, room_name, apartment_name} = req.body;
        const idInt = parseInt(user_id);

        try {
          const registerRoom = await prisma.$queryRawUnsafe('update users set room_id = (select room_id from room a2,(SELECT * from apartment where apartment_name = $1) a1 where a2.apartment_id = a1.apartment_id and a2.room_name = $2) where user_id = $3',
          apartment_name,room_name,idInt);

          if (!registerRoom) {
              return res.status(404).json({ message: `Room ${room_name} not found` });
          }

          return res.status(204).json({
              message: `Room ${room_name} register successfully`,
          });
      } catch (error) {
          next(error);
          throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
      }
      },
};
export default userController;