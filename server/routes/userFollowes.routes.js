import express from 'express'
import { checkBloggerFollowOrUnfollow, fatchUserFollowingBlogger, followBlogger, unfollowBlogger } from '../controllers/userFollowers.controller.js'
import { checkAuth } from '../jwt/AuthToken.js'

export const bloggerFollower = express.Router()

bloggerFollower.post('/followblogger/:blogId',checkAuth, followBlogger)
bloggerFollower.post('/unfollowblogger/:blogId',checkAuth,unfollowBlogger)
bloggerFollower.post('/checkfollowstatus/:blogId',checkAuth,checkBloggerFollowOrUnfollow)
bloggerFollower.post('/getallUserBlogger',checkAuth,fatchUserFollowingBlogger)