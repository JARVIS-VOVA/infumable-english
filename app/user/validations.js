import { body, validationResult } from 'express-validator'

import queriesUser from './queries'
import MESSAGE_I18nt from './messages'

export const validationCreateRules = [
  body('email', MESSAGE_I18nt.validate.email).isEmail().not().isEmpty(),
  body('login', MESSAGE_I18nt.validate.login).exists().not().isEmpty(),
  body('password', MESSAGE_I18nt.validate.password).isLength({ min: 6 }),
  body('password confirmation', MESSAGE_I18nt.validate.passwordConfirmation.notValid).isLength({ min: 6 }).custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(MESSAGE_I18nt.validate.passwordConfirmation.dontMatch);
    }

    return true
  }),
  body('Email and login', MESSAGE_I18nt.validate.uniqEmailAndLogin).custom(async (value, { req }) => {
    const { errors } = validationResult(req)

    if (!isEmpty(errors)) return false

    const { email, login } = req.body

    const user = await queriesUser.users.findByEmailOrLogin(email, login)

    if (user) {
      const isFailedUniqEmail = user.email == email
      const isFailedUniqLogin = user.login == login

      const msgForFailEmail = MESSAGE_I18nt.validate.emailAlreadyUse
      const msgForFailLogin = MESSAGE_I18nt.validate.loginAlreadyUse

      switch (true) {
        case isFailedUniqEmail && isFailedUniqLogin:
          return Promise.reject(msgForFailEmail + ' ' + msgForFailLogin)

        case isFailedUniqEmail:
          return Promise.reject(msgForFailEmail)

        case isFailedUniqLogin: {
          return Promise.reject(msgForFailLogin)
        }
      }
    }
  })
]
