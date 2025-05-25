import express from 'express'
import { checkAuth } from '../jwt/AuthToken.js'
import { blogDislike, bloglike, checkbloglikeordislike, deleteBlog, deleteblogdislike, deletebloglike, fatchAllDislikeBlog, fetchAllLikedBlogs, savedblog, singleBlog, unsavedblog, updateBlog, uploadBlog } from '../controllers/blog.controller.js'
import { blogComments, bloggerHeart, checkBloggerHeart, deleteComment, deleteCommentDislike, deleteCommentLike, dislikeComment, likeComment, removeBloggerHeart, updateBlogComment } from '../controllers/blogComments.controller.js'
import {checkBlogger} from "../middlewares/checkBlogger.js"
export const blogRoute = express.Router()

blogRoute.post('/uploadblog',checkAuth,checkBlogger,uploadBlog)
blogRoute.put('/updateblog/:blogId',checkAuth,checkBlogger,updateBlog)
blogRoute.delete('/deleteblog/:blogId',checkAuth,checkBlogger,deleteBlog)
blogRoute.post('/likeblog/:blogId',checkAuth,bloglike)
blogRoute.post('/dislikeblog/:blogId',checkAuth,blogDislike)
blogRoute.delete('/deletebloglike/:blogId',checkAuth,deletebloglike)
blogRoute.delete('/deleteblogdislike/:blogId',checkAuth,deleteblogdislike)
blogRoute.get('/checkbloglikeordislike/:blogId',checkAuth,checkbloglikeordislike)
blogRoute.post('/savedblog/:blogId',checkAuth,savedblog)
blogRoute.post('/unsavedblog/:blogId',checkAuth,unsavedblog)
blogRoute.get('/singleblog/:blogId',singleBlog)
blogRoute.get('/fatchlikedblog',checkAuth,fetchAllLikedBlogs)
blogRoute.get('/fatchdislikedblog',checkAuth,fatchAllDislikeBlog)