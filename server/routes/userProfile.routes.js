import express from 'express'
import { checkAuth } from '../jwt/AuthToken.js'
import { userAllLikedBlog, userAllSavedBlog, userBlogHistory, userBlogHistoryFatch, userProfile } from '../controllers/userProfile.controller.js'

export const userProfileRouter = express.Router()

userProfileRouter.get('/profile',checkAuth,userProfile)
userProfileRouter.get('/userlikedblog',checkAuth,userAllLikedBlog)
userProfileRouter.get('/usersavedblog',checkAuth,userAllSavedBlog)
userProfileRouter.post('/uploadbloghistory/:blogId',checkAuth,userBlogHistory)
userProfileRouter.get('/getuserbloghistory',checkAuth,userBlogHistoryFatch)
userProfileRouter.get('/fatchallsavedblog',checkAuth,userAllSavedBlog)