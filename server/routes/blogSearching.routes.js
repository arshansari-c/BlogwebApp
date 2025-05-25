import express from 'express'
import { checkAuth } from '../jwt/AuthToken.js'
import { deleteSearchhistory, searchBlog } from '../controllers/blogSearching.controller.js'

export const  blogSearchingRouter = express.Router()

blogSearchingRouter.post('/searchblog',checkAuth,searchBlog)
blogSearchingRouter.delete('/deletesearchhistory/:searchId',checkAuth,deleteSearchhistory)