import express from 'express'
import logger from 'morgan'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
const app = express()

const env = process.env.NODE_ENV || 'development'

const configStr = fs.readFileSync(path.resolve('src/config.json'), 'utf-8')
const config = JSON.parse(configStr)[env]
app.use(cors())
app.use(express.json())
app.use(logger('dev' /*, { skip: (req, res) => res.statusCode < 400 }*/))

app.set('port', process.env.PORT)
app.set('env', env)
app.set('config', config)

export default app
