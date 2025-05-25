import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import OTP from './pages/otp'
import ForgetPassword from './pages/ForgetPassword'
import VerifyEmail from './pages/VerifyEmail'
import SetNewPassword from './pages/setNewPassword'
import Allblogs from './components/Allblogs'
import Animalblog from './components/Animalblog'
import Animeblog from './components/Animeblog'
import Foodblog from './components/foodblog'
import Newsblog from './components/Newsblog'
import Gamingblog from './components/Gamingblog'
import AllBlogs from './pages/AllBlogs'
import About from './pages/about'
import Anime from './pages/Anime'
import Food from './pages/Food'
import Animal from './pages/Animal'
import Gaming from './pages/Gaming'
import News from './pages/News'
import SingleblogPage from './pages/SingleblogPage'
import Profile from './pages/profile'
import Historyblog from './components/menu/Historyblog'
import Likeblog from './components/menu/Likeblog'
import Dislikeblog from './components/menu/Dislikeblog'
import Savedblog from './components/menu/Savedblog'
import Feedbackblog from './components/menu/Feedbackblog'
import BlogComments from './components/menu/blogComments'
import Settings from './components/menu/Setting'
import BlogUpload from './components/menu/UploadBlog'
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='otp' element={<OTP/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgetpassword' element={<ForgetPassword/>}/>
      <Route path='/verifyEmail' element={<VerifyEmail/>}/>
      <Route path='/setnewpassword' element={<SetNewPassword/>}/>
      <Route path='/allblog' element={<Allblogs/>}/>
      <Route path='/animalblog' element={<Animalblog/>}/>
      <Route path='/animeblog' element={<Animeblog/>}/>
      <Route path='/foodblog' element={<Foodblog/>}/>
      <Route path='/newsblog' element={<Newsblog/>}/>
      <Route path='/gamingblog' element={<Gamingblog/>}/>
      <Route path='/allblogs' element={<AllBlogs/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/anime' element={<Anime/>}/>
      <Route path='/food' element={<Food/>}/>
      <Route path='/animal' element={<Animal/>}/>
      <Route path='/gaming' element={<Gaming/>}/>
      <Route path='/news' element={<News/>}/>
      <Route path='/singleblog/:blogId' element={<SingleblogPage/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/historyblogs' element={<Historyblog/>}/>
      <Route path='/likedblogs' element={<Likeblog/>}/>
      <Route path='/dislikeblogs' element={<Dislikeblog/>}/>
      <Route path='/savedblogs' element={<Savedblog/>}/>
      <Route path='/feedback' element={<Feedbackblog/>}/>
      <Route path='/blogcomments' element={<BlogComments/>}/>
      <Route path='/setting' element={<Settings/>}/>
      <Route path='/uploadblog' element={<BlogUpload/>}/>
    </Routes>
    </>
  )
}

export default App