import express from 'express'
import { blogComments, bloggerHeart, checkBlogCommentlike, checkBloggerHeart, commentReply, deleteComment, deleteCommentDislike, 
deleteCommentLike, deleteCommentReply, dislikeComment, fatchCommentReply, fetchBlogComment, likeComment, 
removeBloggerHeart, updateBlogComment } from '../controllers/blogComments.controller.js'
import { checkAuth } from '../jwt/AuthToken.js'


export const blogCommentRoute = express.Router()
blogCommentRoute.post('/uploadcomment/:blogId',checkAuth,blogComments,)
blogCommentRoute.get('/fatchcommentblog/:blogId',fetchBlogComment)
blogCommentRoute.put('/updatecomment/:blogId/:commentId',checkAuth,updateBlogComment)
blogCommentRoute.delete('/deletecomment/:blogId/:commentId',checkAuth,deleteComment)
blogCommentRoute.post('/likedblogcomment/:blogId/:commentId',checkAuth,likeComment)
blogCommentRoute.post('/dislikeblogcomment/:blogId/:commentId',checkAuth,dislikeComment)
blogCommentRoute.delete('/deletecommentlike/:blogId/:commentId',checkAuth,deleteCommentLike)
blogCommentRoute.delete('/deletecommentdislike/:blogId/:commentId',checkAuth,deleteCommentDislike)
blogCommentRoute.post('/getcommentheart/:blogId/:commentId',checkAuth,bloggerHeart)
blogCommentRoute.get('/removecommentheart/:blogId/:commentId',checkAuth,removeBloggerHeart)
blogCommentRoute.get('/checkcommentheartstatus/:blogId/:commentId',checkAuth,checkBloggerHeart)
blogCommentRoute.post('/commentrepley/:blogId/:commentId',checkAuth,commentReply)
blogCommentRoute.get('/fatchblogcommentreply/:blogId/:commentId',fatchCommentReply)
blogCommentRoute.delete('/deletecommentrepley/:blogId/:commentId/:commentReplyId',checkAuth,deleteCommentReply)
blogCommentRoute.get(`/checkcommentlike/:blogId/:commentId`,checkAuth,checkBlogCommentlike)