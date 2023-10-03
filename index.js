
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
var jwt = require('jsonwebtoken');

dotenv.config()

const usersRouter = require('./routes/v1/users.route')
const classroomsRouter = require('./routes/v1/classrooms.route')
const postsRouter = require('./routes/v1/posts.route')
const commentRouter = require('./routes/v1/comments.route');
const verifyJWT = require('./midleware/verifyJWT');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routers
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/classrooms", verifyJWT, classroomsRouter)
app.use("/api/v1/posts", verifyJWT, postsRouter)
app.use("/api/v1/comments", verifyJWT, commentRouter)

const port = process.env.PORT || 3000;
app.post('/jwt', (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_TOKEN)
  res.send({ token })
})

app.get('/', async (req, res) => {
  res.send('Server is running')
});

app.all('*', (req, res) => {
  res.send('Not found')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
