import { container } from 'tsyringe';
import prisma from './infra/prisma/client';
import { PrismaClient } from '@prisma/client';
import { SharedTokens } from './tokens';

export function registerSharedModule(containerInstance = container) {
  containerInstance.registerInstance<PrismaClient>(SharedTokens.PrismaClient, prisma);
}
