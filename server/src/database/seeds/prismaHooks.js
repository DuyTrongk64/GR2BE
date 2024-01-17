import { PrismaClient } from '@prisma/client';

const prismaHooks = new PrismaClient();

prismaHooks.$on('after', async ({ model, action, instance }) => {
  if (model === 'User') {
    const { room_id } = instance;

    if (action === 'create' || action === 'update' || action === 'delete') {
      // Cập nhật trường `participants` dựa trên số lượng user có cùng `room_id`
      const userCount = await prisma.user.count({
        where: { room_id: room_id },
      });

      await prisma.room.update({
        where: { room_id: room_id },
        data: { participants: userCount },
      });
    }
  }
});

export default prismaHooks;