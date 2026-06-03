const express = require('express');
const multer = require('multer');  
const uploadFile = require('./services/storage.services');
const cors = require('cors');


const PostModel = require('./models/post.models');

const connectDB = require('./db/db');
connectDB(); // Connect to the database

const app = express();  
app.use(cors({
  origin:"*"
}));  // CORS middleware ko use krna  
app.use(express.json());

const upload = multer({storage: multer.memoryStorage()} );  // multer ko memory storage ke sath configure krna
    

 
// app.post('/create-post', upload.single('image'),async (req,res)=>{

//   const result = await uploadFile(req.file.buffer);  // file ko upload krna aur uska url result me mil jayega

//   const post = await PostModel.create({
//         image : result.url,  // image url ko post model me save krna
//         caption : req.body.caption,  // caption text ko post model me save krna
//      })

//       res.status(201).json({   
//             message : "Post created successfully",
//             post : post
//         }) 
// })


app.post("/create-post", upload.single("image"), async (req, res) => {
    
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await uploadFile(req.file.buffer);

    const post = await PostModel.create({
      image: result.url,
      caption: req.body.caption,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

app.get('/posts', async (req,res)=>{
    const posts = await PostModel.find();  // database se sare posts ko fetch krna

     res.status(200).json({
        message : "All posts",
        posts : posts
    })

})


app.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id; // URL se post id ko extract krna

  await PostModel.findByIdAndDelete(postId); // database se post ko delete krna

  res.status(200).json({
    message: "Post deleted successfully",
  });
});


module.exports = app;