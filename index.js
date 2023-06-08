
const express=require('express')
const cors=require('cors')
const dotenv= require('dotenv')
dotenv.config()

const usersRouter=require('./routes/users.route')
const classroomsRouter=require('./routes/classrooms.route')
const postsRouter = require('./routes/posts.route')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/users",usersRouter)
app.use("/classrooms",classroomsRouter)
app.use("/posts",postsRouter)


const port = process.env.PORT || 3000;


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
