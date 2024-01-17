import prisma from '../service/prisma.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

const registerController = {
    getAllApartment: async (req, res, next) => {
        try {
            const allApartments = await prisma.apartment.findMany({});
            return res.status(200).json(allApartments);
        } catch (error) {
            next(error);  
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    },

    getAllRoomNotFull: async (req, res, next) => {

        const { apartment_name } = req.query;


        try {
            const apartmentInfo = await prisma.room.findMany({
                where: {
                  Apartment: {
                    apartment_name: apartment_name,
                  }
                },
                select: {
                  room_name: true,
                  participants: true,
                  RoomType: true,
                  
                }
              });

            res.status(StatusCodes.OK).json({apartmentInfo})
        } catch (error) {
            next(error);  
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }

    },
};



export default registerController;
