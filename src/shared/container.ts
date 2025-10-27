import { container } from 'tsyringe';
import prisma from './infra/prisma/client';
import { PrismaClient } from '@prisma/client';

const SharedTokens = {
  PrismaClient: 'PrismaClient'
}

function registerSharedModule(containerInstance = container) {
  containerInstance.registerInstance<PrismaClient>(SharedTokens.PrismaClient, prisma);
}

export { SharedTokens, registerSharedModule };