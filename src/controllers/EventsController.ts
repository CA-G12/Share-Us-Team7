import { Request, Response } from 'express'
import querySchema from '../validation/addEventValidate'
import filterQuerySchema from '../validation/filterEventValidate'
import { Message } from '../config/messages'
import { Event, User } from '../db'
import { Op } from 'sequelize'
import CustomError from '../helpers/CustomError'
import IBetweenFromAndTo from 'interfaces/IFilterEvents'

export default class EventsController {
  // for getting all data
  public static async index (req: Request, res: Response):Promise<void> {
    const { status } = req.query
    const from = req.query?.from as string
    const to = req.query?.to as string

    await filterQuerySchema.validate({ status, from, to })

    const whereObj: {
      status?: string;
      [Op.or]?: [
        { startTime: IBetweenFromAndTo },
        { endTime: IBetweenFromAndTo }
      ];
    } = {}

    if (status) {
      whereObj.status = status as string
    }
    if (from && to) {
      whereObj[Op.or] = [
        {
          startTime: {
            [Op.and]: {
              [Op.gte]: from,
              [Op.lte]: to
            }
          }
        },
        {
          endTime: {
            [Op.and]: {
              [Op.gte]: from,
              [Op.lte]: to
            }
          }
        }
      ]
    }

    const allEvents = await Event.findAll({
      attributes: ['name', 'img', 'description', 'status', 'startTime'],
      include: [{
        model: User,
        attributes: ['username', 'profileImg', 'id']
      }],
      where: whereObj,
      order: [
        ['startTime', 'ASC']
      ]
    })
    res.json({ message: Message.SUCCESS, data: allEvents })
  }

  // for getting just on element of data
  // (like getting just one event may be in event details)
  public static async show (req: Request, res: Response) {
    const { id } = req.params
    const eventDetails:any = await Event.findOne({
      include: [{
        model: User,
        attributes: ['username', 'id']
      }],
      where: {
        id
      }
    })
    if (!eventDetails) throw new CustomError(Message.NOTFOUND, 404)
    res.status(200).json({
      message: Message.SUCCESS,
      data: eventDetails.dataValues
    })
  }

  // for storing new data
  public static async store (req: Request, res: Response) {
    const data = req.body
    await querySchema.validateAsync(req.body)
    const {
      name,
      description,
      img,
      status,
      startTime,
      endTime,
      longitude,
      latitude
    } = req.body
    const event = await Event.create({
      name,
      description,
      img,
      status,
      startTime,
      endTime,
      longitude,
      latitude
    
    })
    res.json({
      message: Message.ADDED,
      data: event
    })
  }

  // for updating new event maybe
  public static async update (req: Request, res: Response) {
    // code here
  }

  // for deleteing an event
  public static async destroy (req: Request, res: Response) {
    // code here
  }
}