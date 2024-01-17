const seedRoomTypes = async (prisma) => {
    await prisma.roomType.create({
        data: {
            gender: 'MALE',
            capacity: 6,
            price: 1800000,
        },
    });

    await prisma.roomType.create({
        data: {
            gender: 'MALE',
            capacity: 8,
            price: 1500000,
        },
    });

    await prisma.roomType.create({
        data: {
            gender: 'MALE',
            capacity: 8,
            price: 1300000,
        },
    });

    await prisma.roomType.create({
        data: {
            gender: 'MALE',
            capacity: 10,
            price: 1200000,
        },
    });

    await prisma.roomType.create({
        data: {
            gender: 'MALE',
            capacity: 12,
            price: 1000000,
        },
    });

    await prisma.roomType.create({
        data: {
            gender: 'FEMALE',
            capacity: 6,
            price: 1800000,
        },
    });

    await prisma.roomType.create({
        data: {
            gender: 'FEMALE',
            capacity: 8,
            price: 1500000,
        },
    });

    await prisma.roomType.create({
        data: {
            gender: 'FEMALE',
            capacity: 8,
            price: 1300000,
        },
    });

    await prisma.roomType.create({
        data: {
            gender: 'FEMALE',
            capacity: 10,
            price: 1200000,
        },
    });

    await prisma.roomType.create({
        data: {
            gender: 'FEMALE',
            capacity: 10,
            price: 1000000,
        },
    });

};

export default seedRoomTypes;

