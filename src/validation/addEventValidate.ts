import Joi from 'joi'
const imagePattern: RegExp = /\.(jpe?g|png|gif|bmp)$/i
const longitude: RegExp = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/
const latitude: RegExp = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/
const querySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
    .min(3)
    .required(),
  startTime: Joi.date()
    .greater(Date.now())
    .required(),
  endTime: Joi.date()
    .greater(Date.now())
    .required(),
  img: Joi.string()
    .pattern(imagePattern)
    .required(),
  status: Joi.any().valid('in-progress', 'closed', 'upcoming'),
  longitude: Joi.string()
    .pattern(longitude)
    .required(),
  latitude: Joi.string()
    .pattern(latitude)
    .required()
})

export default querySchema