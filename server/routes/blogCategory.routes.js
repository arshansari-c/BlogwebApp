import express from 'express'
import { Allblogs, animalBlog, animeBlog, entertainmentBlog, foodBlog, gamingBlog, kpop, newsBlog, techBlog, todayBlog } from '../controllers/blogCategory.controller.js'
export const blogCategory = express.Router()

blogCategory.get('/todayblog',todayBlog)
blogCategory.get('/allblog',Allblogs)
blogCategory.get('/newsblog',newsBlog)
blogCategory.get('/gamingblog',gamingBlog)
blogCategory.get('/foodblog',foodBlog)
blogCategory.get('/entertainment',entertainmentBlog)
blogCategory.get('/tech',techBlog)
blogCategory.get('/animal',animalBlog)
blogCategory.get('/anime',animeBlog)
blogCategory.get('/kpop',kpop)