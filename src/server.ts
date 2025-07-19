import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/task.routes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/tasks', taskRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})
