const seedApartments = async (prisma) => {
    await prisma.apartment.create({
        data: {
            apartment_name: "B7",
            manager_id: 1,
        },
    });

    await prisma.apartment.create({
        data: {
            apartment_name: "B8",
            manager_id: 2,
        },
    });

    await prisma.apartment.create({
        data: {
            apartment_name: "B9",
            manager_id: 3,
        },
    });

    await prisma.apartment.create({
        data: {
            apartment_name: "B10",
            manager_id: 4,
        },
    });
};

export default seedApartments;