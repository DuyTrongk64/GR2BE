import {hashPasswordFunction} from '../../utils/hash.js';

const seedAdmins= async (prisma) => {
    const hashedPassword = await hashPasswordFunction('testpassword');

    for (let i = 1; i < 6; i++) {
        await prisma.user.create({
            data: {
                email: `admin${i + 1}@example.com`,
                full_name: 'nguyen van b',
                mssv: `2015000${i}`,
                password: hashedPassword,
                user_type: 'ADMIN',
                major: 'SOICT',
                gender: 'MALE',
                avatar_url: 'https://example.com/avatar.png',
                batch: 'K53',
                phone_number: '0817223626',
                birthday: '1987-07-08T23:45:59Z',
            },
        });
    }

};

export default seedAdmins;