import { type Note } from "../../generated/prisma/client.js";

export type CreateNoteDto = Pick<Note, "title" | "content">;
