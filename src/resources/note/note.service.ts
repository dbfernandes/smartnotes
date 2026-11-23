import { PrismaClient } from "../../generated/prisma/client.js"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

import getEnv from "../../utils/getEnv.js"
import type { CreateNoteDto } from "./note.types.js"

const env = getEnv()
const adapter = new PrismaMariaDb(env.DATABASE_URL)
const prisma = new PrismaClient({ adapter })

export const getNotes = async () => {
  return prisma.note.findMany()
}

export const createNote = async (data: CreateNoteDto) => {
  return prisma.note.create({ data })
}

export const getNote = async (id: string) => {
  return prisma.note.findUnique({ where: { id } })
}
