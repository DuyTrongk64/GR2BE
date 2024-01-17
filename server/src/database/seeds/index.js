import prisma from '../../service/prisma.js';

import prismaHooks from './prismaHooks.js';

import seedRoomTypes from './roomtypes.js';
import seedUsers from './users.js';
import seedApartments from './apartments.js';
import seedRooms from './rooms.js';
import seedAdmins from './admins.js';

const seed = async () => {
    await seedAdmins(prisma);
    await seedRoomTypes(prisma);
    await seedApartments(prisma);
    await seedRooms(prisma);
    await seedUsers(prisma);

    process.on('beforeExit', () => {
        prismaHooks.$disconnect();
      });
      
    await prisma.$disconnect();
};

seed();