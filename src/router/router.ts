import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.send("teste")
})

router.get("/about", (req, res) => {
  res.send("Página about")
})

export default router
