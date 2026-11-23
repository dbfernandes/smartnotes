import { type Request, type Response } from "express"
import { StatusCodes } from "http-status-codes"
import { createNote, getNote, getNotes } from "./note.service.js"
import { isValidNoteId } from "./note.schema.js"
import type { CreateNoteDto } from "./note.types.js"

const index = async (req: Request, res: Response) => {
  try {
    const notes = await getNotes()
    res.status(200).json(notes)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

const create = async (req: Request, res: Response) => {
  const data = req.body as CreateNoteDto
  try {
    const note = await createNote(data)
    res.status(201).json(note)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

const read = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  if (!isValidNoteId(id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid note id" })
    return
  }

  try {
    const note = await getNote(id)
    if (!note) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found" })
      return
    }
    res.status(StatusCodes.OK).json(note)
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const update = async (req: Request, res: Response) => {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const remove = async (req: Request, res: Response) => {}

export default { index, create, read, update, remove }
