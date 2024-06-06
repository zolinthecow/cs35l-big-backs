// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { songId, userId, content } = req.body;

//     try {
//       const note = await prisma.note.upsert({
//         where: {
//           songId_userId: { songId, userId },  // Assuming a composite unique constraint
//         },
//         update: { content },
//         create: {
//           content,
//           songId,
//           userId,
//         },
//       });
//       res.status(200).json(note);
//     } catch (error) {
//       console.error('Error saving note:', error);
//       res.status(500).json({ error: 'Unable to save note' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
