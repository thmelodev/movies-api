import { Language } from "@prisma/client";

export interface LanguageModel extends Omit<Language, "createdAt" | "updatedAt"> {}