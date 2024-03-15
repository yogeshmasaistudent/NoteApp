const express = require("express");
const { connection } = require("./config/db.connection");
const { UserRouter } = require("./routes/user.route");
const { NoteRouter } = require("./routes/notes.route");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use("/user",UserRouter)
app.use("/notes",NoteRouter)

const PORT = process.env.PORT||3030
app.listen(PORT,async()=>{
  try {
    await connection
    console.log("Connect to db")
    console.log(`Server is running Port ${PORT}`)
  } catch (error) {
    console.log("Server has some error")
  }
})