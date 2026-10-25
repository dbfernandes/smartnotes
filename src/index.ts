import express from "express"
import helmet from "helmet"
import morgan from "morgan"

import getEnv from "./utils/getEnv.js"
import router from "./router/router.js"

const app = express()
const env = getEnv()

app.use(morgan("combined"))
app.use(helmet())
app.use(express.json())
app.use(router)

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
})
