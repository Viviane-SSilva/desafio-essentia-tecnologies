import express from 'express'
import cors from 'cors'
import { routes } from './routes/task.routes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})
