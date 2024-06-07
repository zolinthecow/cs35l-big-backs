'use server';

import sendbirdApi from '@/lib/sendbird';
import prisma from '@/prisma';
import { getSession } from '@auth0/nextjs-auth0';

async function createSBChannelIfNotExisting(userIds: string[]) {
  const channelUrl = userIds.join('_');
  try {
    await sendbirdApi.get(`/group_channels/${channelUrl}`);
    return;
  } catch (e) {
    // I think this will happen if there is no channel so just pass through
  }

  console.log('CREATING GROUP CHANELLLL');
  try {
    await sendbirdApi.post(`/group_channels`, {
      user_ids: userIds,
      channel_url: channelUrl,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default async function sendSBMessage(
  receiverId: string,
  message: string,
) {
  const session = await getSession();
  if (!session?.user?.sub) {
    console.error('NO SESSION');
    throw new Error('UNAUTHENTICATED');
  }

  const bothUsers = await prisma.user.findMany({
    where: {
      id: {
        in: [session.user.sub, receiverId],
      },
    },
    select: {
      id: true,
      sendbirdId: true,
    },
  });

  const userIds = bothUsers
    .filter((u) => u.sendbirdId)
    .map((u) => u.sendbirdId)
    .sort();
  const channelUrl = userIds.join('_');

  await createSBChannelIfNotExisting(userIds as string[]);
  await sendbirdApi.post(`/group_channels/${channelUrl}/messages`, {
    message_type: 'MESG',
    user_id: bothUsers.find((u) => u.id === session.user.sub)?.sendbirdId,
    message,
  });
}
