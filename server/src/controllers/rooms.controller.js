import prisma from '../service/prisma.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

const roomController = {
    getAllByApart: async (req, res, next) => {

        const { apartment_name } = req.query;

        //console.log(apartment_name)

        try {
            const allRoomsByApart = await prisma.room.findMany({
                where: {
                    Apartment: {
                        apartment_name: apartment_name
                    }
                },
                select: {
                    room_name: true,
                    participants: true,
                    RoomType: true,
                }
            });

            res.status(StatusCodes.OK).json({allRoomsByApart})
        } catch (error) {
            next(error);  
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }

    },


    getUserRoom: async (req, res, next) => {
        
        const { id } = req.params;
        const idInt = parseInt(id);
        console.log(id);
        if (isNaN(idInt) || idInt <= 0) {

            return res.status(400).json({ message: 'Invalid student ID' });
        }

        try {
            const room = await prisma.user.findUnique({
                where: {
                    user_id: idInt,
                  },
                  select: {
                    Room: {
                      select: {
                        room_id: true,
                        room_name: true,
                        Apartment: {
                          select: {
                            apartment_name: true,
                          },
                        },
                        User: true,
                        
                      },
                    },
                  },
                })

            return room
                ? res.status(200).json(room)
                : res.status(404).json({ message: `You not in a room` });
        } catch (error) {
            next(error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    },

    getRoomByName: async (req, res, next) => {
        const { room_name, apartment_name } = req.body;

        try {
            const room = await prisma.$queryRawUnsafe('SELECT * from users a4 ,(select * from room a2,(SELECT * from apartment where apartment_name = $1) a1 where a2.apartment_id = a1.apartment_id and a2.room_name = $2) a3 WHERE a4.room_id = a3.room_id',
                apartment_name, room_name)
            return room
                ? res.status(200).json(room)
                : res.status(404).json({ message: `Room ${room_name} not found` });
        } catch (error) {
            next(error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    },

    delete: async (req, res, next) => {
        const { room_name, apartment_name } = req.params;

        try {
            const deletedRoom = await prisma.$queryRawUnsafe('delete from room where room_name in (select a2.room_name from room a2 JOIN apartment a1 ON a2.apartment_id = a1.apartment_id WHERE a1.apartment_name = $1 AND a2.room_name = $2)',
                apartment_name, room_name)

            if (!deletedRoom) {
                return res.status(404).json({ message: `Room ${room_name} not found` });
            }

            return res.status(204).json({
                message: `Room ${room_name} deleted successfully`,
            });
        } catch (error) {
            next(error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    },


};
export default roomController;