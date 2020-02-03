import express from 'express'
import isEmpty from 'lodash.isempty'
import { validationResult } from 'express-validator'

import hashPassword from '../../lib/hashPassword'

import queriesUser from './queries'
import MESSAGE_I18nt from './messages'
import { validationCreateRules } from './validations'

const router = express.Router()

router.post('/users', validationCreateRules, async (req, res, next) => {
  const { errors } = validationResult(req)

  if (!isEmpty(errors)) return res.status(422).json({ message: errors })

  const { email, login, password } = req.body

  const user = {
    email,
    login,
    password: await hashPassword(password)
  }

  await queriesUser.users.create(user)

  res.status(201).send({ message: MESSAGE_I18nt.createUser.successfully })
})

module.exports = router
