const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchUser')
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');


//Router 1:Get all the notes using:GET"/api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{
        userId=req.user.id;
        //finding the user data with the id from token
        const notes=await Notes.find({user:userId})
        res.json(notes)
      }
      catch(err){
            //responding with error message if unable to connect with server or any else error occurred
            res.status(500).send(err.message)
      }
})

//Router 2:Adding a note using:POST"/api/notes/addnote
router.post('/addnote',fetchuser,[
    body('title','Enter a Valid Title!!!Mininum 3 characters  required in name').isLength({ min: 3 }),
  body('description','Mininum 8 characters  required in password').isLength({ min: 5 })
],async(req,res)=>{

    
    //if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        
        let data=await Notes.create({
            user:req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
          })
          console.log(data);
        res.json(data)
    } catch (error) {
        res.status(500).send('Internal Sever Error Occurred')   
    }
})

//Router 3:Updating a note using:PUT"/api/notes/update
router.put('/update/:id',fetchuser,[
    body('title','Enter a Valid Title!!!Mininum 3 characters  required in name').isLength({ min: 3 }),
  body('description','Mininum 8 characters  required in password').isLength({ min: 5 })
],async(req,res)=>{

    
    //if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        console.log('request body',req.body);
        const {title,description,tag}=req.body;

        const newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}
        console.log(newNote);
        
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("not found")}

        if(note.user.toString()!==req.user.id){return res.status(401).send("Not allowed")}
        console.log('newNote :>> ', newNote);
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

        res.json(note);
    } catch (error) {
        res.status(500).send('Internal Sever Error Occurred')   
    }
})

//Router 3:deleting a note using:DELETE"/api/notes/delete
router.delete('/delete/:id',fetchuser,async(req,res)=>{

    
    try {
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("not found")}

        if(note.user.toString()!==req.user.id){return res.status(401).send("Not allowed")}
        note = await Notes.findByIdAndDelete(req.params.id)

        res.json(note);
    } catch (error) {
        res.status(500).send('Internal Sever Error Occurred')   
    }
})

module.exports=router