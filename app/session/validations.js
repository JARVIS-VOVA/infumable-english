import { body, validationResult } from 'express-validator'

import MESSAGE_I18nt from './messages'

export const validationCreateRules = [
  body('email', MESSAGE_I18nt.validate.email).isEmail().not().isEmpty(),
  body('password', MESSAGE_I18nt.validate.password).isLength({ min: 6 }),
]
