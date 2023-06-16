
const express=require('express')
const cors=require('cors')
const dotenv= require('dotenv')
dotenv.config()

const usersRouter=require('./routes/v1/users.route')
const classroomsRouter=require('./routes/v1/classrooms.route')
const postsRouter = require('./routes/v1/posts.route')
const commentRouter = require('./routes/v1/comments.route')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routers
app.use("/api/v1/users",usersRouter)
app.use("/api/v1/classrooms",classroomsRouter)
app.use("/api/v1/posts",postsRouter)
app.use("/api/v1/comments",commentRouter)


const port = process.env.PORT || 3000;
/* app.get('/api/v1/posts/:id', async (req, res) => {
  res.send('Server is running')
}); */
app.get('/', async (req, res) => {
  res.send('Server is running')
});

app.all('*',(req,res)=>{
  res.send('Not found')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
