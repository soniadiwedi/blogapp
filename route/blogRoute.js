const express=require('express')
const BlogModel = require('../model/blog.model')
const { authenticateToken } = require('../middleware/auth')
const blogRouter=express.Router()

blogRouter.post("/blogs",async(req,res)=>{
    const payload = req.body
    try{
        const blog= new BlogModel(payload)
        await blog.save()
        res.status(200).send({"message":"New Blog has been added",blog})
    }catch(err){
        res.status(400).send({"message":err.message})
    }
})
//geting data( http://localhost:4000/api/blogs?page=1&limit=5&title=beapsent&sort=date&order=desc)
blogRouter.get("/blogs",authenticateToken,async(req,res)=>{
    try{
        const {page=1,limit=5,title,category,sort,order='asc'}=req.query
         //search
        let query={}      
        if(title){
            query.title={$regex:title,$options:"i"}
        }
        if(category){
            query.title=category
        }
        //sort by date
        const sortData={}
        if(sort==='date'){
            sortData.date=order==='asc'?1:-1
        }

         const allblogs=await BlogModel.find(query).sort(sortData).skip((page-1)*limit).limit(parseInt(limit))
         res.status(200).json(allblogs)
    } catch (error) {
        console.error('Error getting blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})

//updating blog
blogRouter.patch("/blogs/:id",authenticateToken,async(req,res)=>{
    const {id}=req.params
    const data=req.body
    try{
        await BlogModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send({"msg":"blog has been updated"})
    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})

//updating blog ---for like
blogRouter.patch('/blogs/:id/like', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.user; // Get the logged in user's ID from the token
  
      // Check if the blog exists
      const blog = await blogRouter.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      // Check if the user has already liked the blog
      if (blog.likes.includes(userId)) {
        return res.status(400).json({ message: 'You have already liked this blog' });
      }
  
      // Add the user's ID to the likes array
      blog.likes.push(userId);
      await blog.save();
  
      res.json({ message: 'Blog liked successfully', blog });
    } catch (error) {
      console.error('Error liking blog:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  blogRouter.put('/blogs/:id/comment', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.user; // Get the logged in user's ID from the token
      const { content } = req.body;
  
      // Check if the blog exists
      const blog = await BlogModel.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      // Add the comment to the blog
      const comment = { userId, content };
      blog.comments.push(comment);
      await blog.save();
  
      res.json({ message: 'Comment added successfully', blog });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports=blogRouter


// "username": "coreyschafer",
//     "title": "Be Present",
//     "content": "Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.",
// 		"category" : "Entertainment",
// 		"date" : "2017-06-01",
// 		"likes" : 24,
// 		"comments": [{ "username": "Jane", "content": "Good One" }, { "username": "Bob", "content": "Loved It!" }]
