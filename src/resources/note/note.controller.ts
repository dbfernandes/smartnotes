import { type Request, type Response } from "express";
import { createNote, getNotes } from "./note.service.js";
import type { CreateNoteDto } from "./note.types.js";

const index = async (req: Request, res: Response) => {
  try {
    const notes = await getNotes();
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const create = async (req: Request, res: Response) => {
  const data = req.body as CreateNoteDto;
  try {
    const note = await createNote(data);
    res.status(201).json(note);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const read = async (req: Request, res: Response) => {};
const update = async (req: Request, res: Response) => {};
const remove = async (req: Request, res: Response) => {};

export default { index, create, read, update, remove };
