import { Blog } from "../models/blog.model.js";
import { BlogComment } from "../models/blogComment.model.js";

export const blogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;
    const { comment } = req.body;

    
    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

  
    const findBlog = await Blog.findById(blogId);
    if (!findBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    
    let blogCommentDoc = await BlogComment.findOne({ blogId });

    if (!blogCommentDoc) {
      
      blogCommentDoc = new BlogComment({
        blogId,
        comments: [
          {
            userComment: comment,
            commentUserId: userId,
          },
        ],
      });
    } else {
    
      blogCommentDoc.comments.push({
        userComment: comment,
        commentUserId: userId,
      });
    }

    
    await blogCommentDoc.save();

    res.status(200).json({ message: "Comment uploaded successfully" });
  } catch (error) {
    console.log("blog comment error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBlogComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const userId = req.user._id;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const blogCommentDoc = await BlogComment.findOne({ blogId });

    if (!blogCommentDoc) {
      return res.status(404).json({ message: "Blog comments not found" });
    }

    // Find the comment in the array by commentId
    const commentToUpdate = blogCommentDoc.comments.find(
      (c) => c._id.toString() === commentId.toString()
    );

    // If not found or unauthorized
    if (!commentToUpdate || commentToUpdate.commentUserId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Comment not found or unauthorized" });
    }

    // Update the comment
    commentToUpdate.userComment = comment;
    await blogCommentDoc.save();

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Update blog comment error", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const userId = req.user._id;

    const blogCommentDoc = await BlogComment.findOne({ blogId });
    if (!blogCommentDoc) {
      return res.status(404).json({ message: "Blog comments not found" });
    }

    const commentIndex = blogCommentDoc.comments.findIndex(
      (c) => c._id.toString() === commentId.toString()
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const comment = blogCommentDoc.comments[commentIndex];

    if (comment.commentUserId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    // Remove the comment from the array
    blogCommentDoc.comments.splice(commentIndex, 1);
    await blogCommentDoc.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Delete comment error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const likeComment = async (req, res) => {
    try {
      const { blogId, commentId } = req.params;
      const userId = req.user._id;
  
      const blogCommentDoc = await BlogComment.findOne({ blogId });
      if (!blogCommentDoc) {
        return res.status(404).json({ message: "Blog comments not found" });
      }
  
      
      const comment = blogCommentDoc.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      
      const alreadyLiked = comment.likes.includes(userId);
      if (alreadyLiked) {
        return res.status(400).json({ message: "You already liked this comment" });
      }
  
      
      comment.dislikes = comment.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
  
      
      comment.likes.push(userId);
  
      await blogCommentDoc.save();
      return res.status(200).json({ message: "Comment liked successfully" });
  
    } catch (error) {
      console.log("like comment error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const dislikeComment = async (req, res) => {
    try {
      const { blogId, commentId } = req.params;
      const userId = req.user._id;
  
      const blogCommentDoc = await BlogComment.findOne({ blogId });
      if (!blogCommentDoc) {
        return res.status(404).json({ message: "Comment blog not found" });
      }
  
      const comment = blogCommentDoc.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      const alreadyDisliked = comment.dislikes.includes(userId);
      if (alreadyDisliked) {
        return res.status(400).json({ message: "You already disliked this comment" });
      }
  
      
      comment.likes = comment.likes.filter((id) => id.toString() !== userId.toString());
  
      
      comment.dislikes.push(userId);
  
      await blogCommentDoc.save();
  
      return res.status(200).json({ message: "Comment disliked successfully" });
    } catch (error) {
      console.log("dislike comment error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const deleteCommentLike = async (req, res) => {
    try {
      const { blogId, commentId } = req.params;
      const userId = req.user._id;
  
      
      const findcommentDoc = await BlogComment.findOne({blogId:blogId});
      if (!findcommentDoc) {
        return res.status(400).json({ message: "Comment blog not found" });
      }
  
      
      const comment = findcommentDoc.comments.id(commentId);
      if (!comment) {
        return res.status(400).json({ message: "Comment not found" });
      }
  
      
      const findlike = comment.likes.includes(userId);
      if (!findlike) {
        return res.status(400).json({ message: "User has not liked this comment" });
      }
  
      
      comment.likes = comment.likes.filter((id) => id.toString() !== userId.toString());
  
      
      await findcommentDoc.save();
  
      res.status(200).json({ message: "Like removed successfully" });
    } catch (error) {
      console.log("Delete comment like error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

 
  export const deleteCommentDislike = async (req, res) => {
    try {
      const { blogId, commentId } = req.params;
      const userId = req.user._id;
  
      const findcommentDoc = await BlogComment.findOne({blogId:blogId});
      if (!findcommentDoc) {
        return res.status(404).json({ message: "Comment blog not found" });
      }
  
      const comment = findcommentDoc.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      if (!comment.dislikes.includes(userId)) {
        return res.status(400).json({ message: "User has not disliked this comment" });
      }
  
      comment.dislikes = comment.dislikes.filter((id) => id.toString() !== userId.toString());
  
      await findcommentDoc.save();
  
      res.status(200).json({
        message: "Dislike removed successfully",
      });
    } catch (error) {
      console.log("Delete comment dislike error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const checkBlogCommentlike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { blogId, commentId } = req.params;

    // Find blog comment entry by blogId
    const findComment = await BlogComment.findOne({ blogId: blogId });

    if (!findComment) {
      return res.status(400).json({ message: "Comment list not found for this blog" });
    }

    // Find the specific comment by commentId from the nested comments array
    const comment = findComment.comments.find(
      (comm) => comm._id.toString() === commentId
    );

    if (!comment) {
      return res.status(400).json({ message: "Comment not found" });
    }

    const commentLike = comment.likes.includes(userId.toString());
    const commentDislike = comment.dislikes.includes(userId.toString());

    if (commentLike) {
      return res.status(200).json({
        message: "User liked this comment",
        liked: true,
        disliked: false,
      });
    }

    if (commentDislike) {
      return res.status(200).json({
        message: "User disliked this comment",
        liked: false,
        disliked: true,
      });
    }

    return res.status(200).json({
      message: "User has not liked or disliked the comment",
      liked: false,
      disliked: false,
    });
  } catch (error) {
    console.log("checkBlogCommentlike error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

  export const bloggerHeart = async (req, res) => {
    try {
      const userId = req.user._id;
      const { blogId, commentId } = req.params;
  
      const findblog = await Blog.findById(blogId);
      if (!findblog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      if (findblog.creatorId.toString() !== userId.toString()) {
        return res.status(403).json({ message: "You are not the creator of this blog" });
      }
  
      const commentDoc = await BlogComment.findOne({ blogId });
      if (!commentDoc) {
        return res.status(404).json({ message: "Comment blog not found" });
      }
  
      const comment = commentDoc.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      if (comment.bloggerHearted === true) {
        return res.status(400).json({ message: "You have already given a heart to this comment" });
      }
  
      comment.bloggerHearted = true;
  
      await commentDoc.save();
  
      return res.status(200).json({ message: "You successfully gave a heart to this comment" });
    } catch (error) {
      console.log("blogger heart error", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  };
  

  export const removeBloggerHeart = async (req, res) => {
    try {
      const userId = req.user._id;
      const { blogId, commentId } = req.params;
  
      const findblog = await Blog.findById(blogId);
      if (!findblog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      if (findblog.creatorId.toString() !== userId.toString()) {
        return res.status(403).json({ message: "You are not the creator of this blog" });
      }
  
      const commentDoc = await BlogComment.findOne({ blogId: blogId });
      if (!commentDoc) {
        return res.status(404).json({ message: "Comment blog not found" });
      }
  
      const comment = commentDoc.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      if (comment.bloggerHearted === false) {
        return res.status(400).json({ message: "You have not hearted this comment" });
      }
  
      comment.bloggerHearted = false;
      await commentDoc.save();
  
      return res.status(200).json({ message: "Comment heart removed successfully" });
  
    } catch (error) {
      console.log("Remove blogger heart error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
 
  export const checkBloggerHeart = async (req, res) => {
    try {
      const { blogId, commentId } = req.params;
  
      
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  

      const commentDoc = await BlogComment.findOne({ blogId });
      if (!commentDoc) {
        return res.status(404).json({ message: "Comment blog not found" });
      }
  
      
      const comment = commentDoc.comments.id(commentId); 
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      
      if (comment.bloggerHearted === true) {
        return res.status(200).json({ message: "This comment is hearted by blogger", hearted: true });
      } else {
        return res.status(200).json({ message: "This comment is not hearted by blogger", hearted: false });
      }
  
    } catch (error) {
      console.log("Check blogger heart error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const commentReply = async (req, res) => {
    try {
      const { blogId, commentId } = req.params;
      const { reply } = req.body;
      const userId = req.user._id;
  
      if (!reply) {
        return res.status(400).json({ message: "Reply is required" });
      }
  
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      const commentDoc = await BlogComment.findOne({ blogId: blogId }); 
      if (!commentDoc) {
        return res.status(404).json({ message: "Blog comment doc not found" });
      }
  
      const comment = commentDoc.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
    
      comment.replies.push({
        replyUserId: userId,
        replyComment: reply
      });
  
      await commentDoc.save(); 
  
      res.status(200).json({ message: "Reply uploaded successfully" });
  
    } catch (error) {
      console.log("Comment reply error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
 
  export const fatchCommentReply = async (req, res) => {
    try {
      const { blogId, commentId } = req.params;
  
      const findCommentDoc = await BlogComment.findOne({ blogId })
        .populate('comments.replies.replyUserId', 'username userImage'); // ✅ populate nested user info
  
      if (!findCommentDoc) {
        return res.status(404).json({ message: "Blog comment document not found" });
      }
  
      const findComment = findCommentDoc.comments.find(
        (comment) => comment._id.toString() === commentId
      );
  
      if (!findComment) {
        return res.status(400).json({ message: "Comment not found" });
      }
  
      res.status(200).json({
        message: "Reply fetched successfully",
        reply: findComment.replies || [],
      });
  
    } catch (error) {
      console.log("fatchCommentReply error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  export const deleteCommentReply = async (req, res) => {
    try {
      const { blogId, commentId, commentReplyId } = req.params;
      const userId = req.user._id;
  
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      const commentDoc = await BlogComment.findOne({ blogId: blogId });
      if (!commentDoc) {
        return res.status(404).json({ message: "Blog comment doc not found" });
      }
  
      const comment = commentDoc.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      const replyIndex = comment.replies.findIndex(
        (reply) => reply._id.toString() === commentReplyId
      );
  
      if (replyIndex === -1) {
        return res.status(404).json({ message: "Reply not found" });
      }
  
      const reply = comment.replies[replyIndex];
      if (reply.replyUserId.toString() !== userId.toString()) {
        return res.status(403).json({ message: "This is not your reply" });
      }
  
      
      comment.replies.splice(replyIndex, 1);
  
      
      await commentDoc.save();
  
      res.status(200).json({ message: "Reply deleted successfully" });
  
    } catch (error) {
      console.log("Delete comment reply error:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  };
  
  export const fetchBlogComment = async (req, res) => {
    try {
      const { blogId } = req.params;
  
      const findblog = await Blog.findById(blogId);
      if (!findblog) {
        return res.status(400).json({ message: "Blog not found" });
      }
  
      const findblogComment = await BlogComment.findOne({ blogId: blogId })
        .select("+comments")
        .populate("comments.commentUserId", "username userImage");
  
      if (!findblogComment) {
        return res.status(400).json({ message: "Blog comment not found" });
      }
  
      const comments = findblogComment.comments;
      return res.status(200).json({ message: "Comment fetched successfully", comments });
    } catch (error) {
      console.log("fetchBlogComment error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  