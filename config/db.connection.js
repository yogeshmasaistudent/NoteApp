const mongoose = require("mongoose");


const connection = mongoose.connect("mongodb+srv://kushawahyogesh93:Yogesh@cluster0.j9tkecq.mongodb.net/FullstackApp?retryWrites=true&w=majority&appName=Cluster0")


module.exports = {
     connection
}