import express from 'express'
import dotenv from 'dotenv'
import { mongodb } from './db/mongoose.js'
import { UserRouter } from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { blogRoute } from './routes/blog.routes.js'
import { blogCategory } from './routes/blogCategory.routes.js'
import { blogCommentRoute } from './routes/blogComment.routes.js'
import { userProfileRouter } from './routes/userProfile.routes.js'
import { bloggerFollower } from './routes/userFollowes.routes.js'
import { blogSearchingRouter } from './routes/blogSearching.routes.js'
import cors from 'cors'
// ✅ IMPORTANT

const app = express()
dotenv.config({ path: './config/.env' })
app.use(express.json())
app.use(fileUpload({ useTempFiles: true })); 
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.get('/',(req,res)=>{
    res.send("Hello world")
})
mongodb()

app.use('/user',UserRouter)
app.use('/blog',blogRoute)
app.use('/blog/category',blogCategory)
app.use('/blog/comment',blogCommentRoute)
app.use('/user/profile',userProfileRouter)
app.use('/user/follow',bloggerFollower)
app.use('/blogsearch',blogSearchingRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Your server running on http://localhost:${process.env.PORT}`)
})