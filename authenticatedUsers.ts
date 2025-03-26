import { type Request, type Response, type NextFunction } from 'express'
import { UserModel } from '../models/user'
import { decode } from 'jsonwebtoken'
import * as security from '../lib/insecurity'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function retrieveUserList (req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body
    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: 'error', message: 'Invalid email format' })
    }

    const users = await UserModel.findAll()
SS
    res.json({
      status: 'success',
      data: users.map((user) => {
        const userToken = security.authenticatedUsers.tokenOf(user)
        let lastLoginTime: number | null = null
        if (userToken) {
          const parsedToken = decode(userToken, { json: true })
          lastLoginTime = parsedToken ? Math.floor(new Date(parsedToken?.iat ?? 0 * 1000).getTime()) : null
        }

        const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' }) // Secure token generation

        return {
          ...user.dataValues,
          password: user.password?.replace(/./g, '*'),
          totpSecret: user.totpSecret?.replace(/./g, '*'),
          lastLoginTime,
          token
        }
      })
    })
  } catch (error) {
    next(error)
  }
}

export default () => retrieveUserList

