const express = require("express");
const { NotesModel } = require("../models/note.models");
const { auth } = require("../middlewares/auth.middleware");
const NoteRouter = express.Router();



NoteRouter.post("/create",auth,async(req,res)=>{
     try {
       const notes = new NotesModel(req.body);
       await notes.save();
       res.status(200).json({msg:"Notes has been added"})
       }catch (error){
        res.status(400).json({msg:"Internal Error"});
     }
})

NoteRouter.get("/",auth,async(req,res)=>{
    try {
    const  notes = await NotesModel.find({userID:req.body.userID});
        res.status(200).json({msg:"Details your taks",notes})
    } catch (error) {
        res.status(200).json({msg:"Internal Error"})
    }
})



// **********************************************************************

// This is vary important please try to go throgh many time it . 

NoteRouter.patch("/:noteID",auth,async(req,res)=>{
    const payload = req.body;
    const {noteID} = req.params;
    try {
      const note = await NotesModel.findOne({_id:noteID});
      if(req.body.userID==note.userID){
        await NotesModel.findByIdAndUpdate({_id:noteID},payload);
        res.status(200).json({msg:`The note with id ${noteID} has been updated`});
      }else{
        res.status(200).json({msg:"you don't have accese to update someelse notes"})
      }
    } catch (error) {
        res.status(400).json({msg:"Internal Error Here"})
    }
})


// *************************************************************************
NoteRouter.delete("/:noteID",auth,async(req,res)=>{
    const {noteID} = req.params;
    try {
        const note = await NotesModel.findOne({_id:noteID});
        if(req.body.userID==note.userID){
            await NotesModel.findByIdAndDelete({_id:noteID});
            res.status(200).json({msg:`Note has been deleted with id ${noteID}`})
        }
    } catch (error) {
        res.status(400).json({msg:"Internal Error"});
    }
})





module.exports = {
    NoteRouter
}