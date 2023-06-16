import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { thinkerValidationSchema } from 'validationSchema/thinkers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getThinkers();
    case 'POST':
      return createThinker();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getThinkers() {
    const data = await prisma.thinker
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'thinker'));
    return res.status(200).json(data);
  }

  async function createThinker() {
    await thinkerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.resource?.length > 0) {
      const create_resource = body.resource;
      body.resource = {
        create: create_resource,
      };
    } else {
      delete body.resource;
    }
    const data = await prisma.thinker.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
