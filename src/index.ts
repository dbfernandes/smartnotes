import express from "express"
import getEnv from "./utils/getEnv.js"

const app = express()
const env = getEnv()
// Teste

const PORT = env.PORT

app.get("/", (req,res) => {
    res.send("teste")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

