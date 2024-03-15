const mongoose = require("mongoose");
const NotesSchema = mongoose.Schema({
      title:String,
      body:String,
      username:String,
      userID:String
})

const NotesModel = mongoose.model("note",NotesSchema);

module.exports = {
    NotesModel
}