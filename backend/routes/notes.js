const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//Get loggedin User details using GET request "/api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

//Add note  using POST request "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

//Update  an existing note  using PUT request "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //find the note of user to be updated
        let note = await Note.findById(req.params.id);

        // if note does not exist then return error: Not found
        if (!note) return res.status(400).send("Not Found");

        // check if user id of note is same as user id of req object. If not, then access denied
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })   //update the note
        res.json(note);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

})

//Delete  an existing note  using DELETE request "/api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        //find the note of user to be deleted
        let note = await Note.findById(req.params.id);

        // if note does not exist then return error: Not found
        if (!note) return res.status(400).send("Not Found");

        // check if user id of note is same as user id of req object. If not, then access denied
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied")
        }

        note = await Note.findByIdAndDelete(req.params.id)   //update the note
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }


})

module.exports = router;