import React from 'react'
import { useParams } from 'react-router-dom'
import Singleblog from '../components/Singleblog'
import RecommendBlog from '../components/RecommendBlog'

const SingleblogPage = () => {
    const {blogId} = useParams()
  return (
    <div className='flex gap-4 px-6 py-4 text-white'>
        <Singleblog blogId={blogId} />
        <RecommendBlog/>
    </div>
  )
}

export default SingleblogPage