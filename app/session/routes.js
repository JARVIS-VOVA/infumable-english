import express from 'express'
import isEmpty from 'lodash.isempty'
import bcrypt from 'bcrypt'
import { body, check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import nodeCookie from 'node-cookie'

import queriesUser from '../user/queries'
import verifyJWT_MW from '../../lib/verifyJWT_MW'

import { validationCreateRules } from './validations'

const router = express.Router()

router.post('/sessions', validationCreateRules, async (req, res, next) => {
  const { errors } = validationResult(req)

  if (!isEmpty(errors)) return res.status(422).json({ message: errors })

  const { email, password } = req.body

  const user = await queriesUser.users.findByEmail(email)

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  // TODO: Change secretKey

  if (isPasswordCorrect) {
    const token = jwt.sign({ user }, 'secretKey', { expiresIn: '2 days' })

    nodeCookie.create(res, 'token', token)

    res.status(201).send({ message: 'Успішно login...', data: user })
  } else {
    res.status(422).json({ message: [{ data: 'Invalid data...' }] })
  }
})

router.get('/sessions', verifyJWT_MW, (req, res, next) => {
  res.status(200).json({ data: req.user })
})

router.delete('/sessions', verifyJWT_MW, (req, res, next) => {
  nodeCookie.clear(res, 'token')

  res.status(201).send({ message: 'Успішно logout...' })
})

module.exports = router
