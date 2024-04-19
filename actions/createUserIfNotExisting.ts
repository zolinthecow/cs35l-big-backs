import prisma from '~/prisma';

export default async function createUserIfNotExisting(
  userId: string,
  nickname: string,
) {
  const prismaUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (prismaUser != null) return;

  await prisma.user.create({
    data: {
      id: userId,
      nickname: nickname,
    },
  });
}
