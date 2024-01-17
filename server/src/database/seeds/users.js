import {hashPasswordFunction} from '../../utils/hash.js';

const seedUsers = async (prisma) => {
    const hashedPassword = await hashPasswordFunction('testpassword');

    function generateRandomNumber() {
        return Math.floor(Math.random() * 144) + 1 ; 
      }

    for (let i = 0; i < 1000; i++) {
        let ran = generateRandomNumber();
        await prisma.user.create({
            data: {
                email: `user${i + 1}@example.com`,
                full_name: 'nguyen van a',
                mssv: `${20191234+i}`,
                password: hashedPassword,
                user_type: 'USER',
                room_id: ran,
                major: 'CNTT VN - Information Technology Specialist 2019',
                gender: 'MALE',
                avatar_url: 'https://example.com/avatar.png',
                batch: 'K64',
                phone_number: '0817223626',
                birthday: '2001-11-01T23:45:59Z',
            },
        });
    }

};

export default seedUsers;