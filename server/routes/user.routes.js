// user.routes.js
import express from 'express'
import { ConverInBlogger, forgetPasswordOtp, login, logout, register, resetPassword, setNewPassword, verifyAccount } from '../controllers/user.controller.js' // or wherever your function is
import { checkAuth } from '../jwt/AuthToken.js'

export const UserRouter = express.Router()

UserRouter.post('/register', register) // ✅ POST method
UserRouter.post('/verifyaccount',verifyAccount)
UserRouter.post('/forgetpasswordotp',forgetPasswordOtp)
UserRouter.post('/resetpassword',resetPassword)
UserRouter.put('/setnewpassword',setNewPassword)
UserRouter.post('/login',login)
UserRouter.post('/logout',logout)
UserRouter.post('/Convertinblogger',checkAuth,ConverInBlogger)
