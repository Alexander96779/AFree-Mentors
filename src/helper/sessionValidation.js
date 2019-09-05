/* eslint-disable newline-per-chained-call */
import Joi from '@hapi/joi';

const sessionSchema = Joi.object().keys({
  Id: Joi.number(),
  mentorId: Joi.number().required(),
  menteeId: Joi.number(),
  questions: Joi.string().min(5).max(30).required(),
  menteeEmail: Joi.string().email().required(),
  status: Joi.string().required(),
});

export default sessionSchema;
