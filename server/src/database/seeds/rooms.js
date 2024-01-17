const seedRooms = async (prisma) => {
    for (let k = 1; k < 5; k++) {
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 10; j++) {
                await prisma.room.create({
                    data: {
                        room_name: `${i}0${j}`,
                        room_type_id: j,
                        apartment_id: k,
                    },
                });
            }
        }
    }

};

export default seedRooms;
