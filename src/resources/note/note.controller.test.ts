import { beforeEach, describe, expect, test, vi } from "vitest"
import type { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import noteController from "./note.controller.js"
import { getNote } from "./note.service.js"

vi.mock("./note.service.js", () => ({
  getNote: vi.fn(),
  getNotes: vi.fn(),
  createNote: vi.fn(),
}))

const mockedGetNote = vi.mocked(getNote)

const makeRequest = (id: string) =>
  ({ params: { id } }) as unknown as Request<{ id: string }>

const makeResponse = () => {
  const res = {
    status: vi.fn(),
    json: vi.fn(),
  }
  res.status.mockReturnValue(res)
  res.json.mockReturnValue(res)
  return res
}

const VALID_ID = "3f1c2b4e-8a9d-4c6e-b7f0-1a2b3c4d5e6f"

describe("GET /notes/:id (read)", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  test("retorna 200 com a nota quando ela existe", async () => {
    const note = {
      id: VALID_ID,
      title: "Minha nota",
      content: "Conteúdo da nota",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockedGetNote.mockResolvedValue(note)
    const res = makeResponse()

    await noteController.read(makeRequest(VALID_ID), res as unknown as Response)

    expect(mockedGetNote).toHaveBeenCalledWith(VALID_ID)
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.json).toHaveBeenCalledWith(note)
  })

  test("retorna 404 quando a nota não existe", async () => {
    mockedGetNote.mockResolvedValue(null)
    const res = makeResponse()

    await noteController.read(makeRequest(VALID_ID), res as unknown as Response)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({ message: "Note not found" })
  })

  test("retorna 400 sem consultar o banco quando o id não é UUID", async () => {
    const res = makeResponse()

    await noteController.read(makeRequest("abc"), res as unknown as Response)

    expect(mockedGetNote).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid note id" })
  })

  test("retorna 500 com mensagem genérica em erro inesperado", async () => {
    mockedGetNote.mockRejectedValue(new Error("connection refused at db:3306"))
    const res = makeResponse()

    await noteController.read(makeRequest(VALID_ID), res as unknown as Response)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" })
  })
})
