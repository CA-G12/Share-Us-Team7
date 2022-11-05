import express, { Application, NextFunction, Request, Response } from 'express'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes'
import config from './config/environment'
import Websocket from './notificationSystem/serverSocket'
import NotificationSocket from './notificationSystem/notification.socket'
import { createServer } from 'http'
import reminderEmail from './cronJobs/ReminderEmail'
import changeStatus from './cronJobs/changeStatus'
import { ScheduledTask } from 'node-cron'
import { join } from 'path'

class App {
  public app: Application
  public nodeEnv: string
  public cronJobs: Array<ScheduledTask>

  constructor () {
    this.app = express()
    this.cronJobs = []
    this.nodeEnv = config.nodeEnv
    this.initializeMiddlwares()
    this.initializeCronJobs()
  }

  private initializeMiddlwares () {
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())
    this.app.use('/api/v1', router)
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status).json({ message: err.message })
    })
  }

  private initializeCronJobs () {
    this.cronJobs = [
      reminderEmail(),
      changeStatus()
    ]
  }
}

const { app, cronJobs } = new App()

if (config.nodeEnv === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'public')))

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'public', 'index.html'))
  })
}

export { cronJobs }

const httpServer = createServer(app)
const io = Websocket.getInstance(httpServer)

io.initializeHandlers([
  { path: '/notifications', handler: new NotificationSocket() }
])

export default httpServer
