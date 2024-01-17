const seedRegistration = async (prisma) => {
    await prisma.registration.create({
        data: {
            registration_name: "Đợt 1",
            end_register:'2019-07-15T00:00:00.000Z',
            semester: "2019-1",
            status: "CLOSE"
        },

        data: {
            registration_name: "Đợt 2",
            end_register:'2019-11-15T00:00:00.000Z',
            semester: "2019-2",
            status: "CLOSE"
        },

        data: {
            registration_name: "Đợt 1",
            end_register:'2020-03-15T00:00:00.000Z',
            semester: "2020-1",
            status: "CLOSE"
        },

        data: {
            registration_name: "Đợt 2",
            end_register:'2019-07-15T00:00:00.000Z',
            semester: "2020-2",
            status: "CLOSE"
        },

        data: {
            registration_name: "Đợt 1",
            end_register:'2023-11-15T00:00:00.000Z',
            semester: "2023-1",
            status: "CLOSE"
        },

        data: {
            registration_name: "Đợt 2",
            end_register:'2023-03-15T00:00:00.000Z',
            semester: "2023-2",
            status: "OPENING"
        },
    });
};

export default seedRegistration;