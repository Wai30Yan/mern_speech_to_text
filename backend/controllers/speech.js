import Speech from "../models/speech.js"
import mongoose from 'mongoose';

export const getSpeeches = async (req, res) => {
    try {
        const speech = await Speech.find()
        res.status(200).json(speech)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getSpeech = async (req, res) => {
    const { id } = req.params

    try {
        const speech = await Speech.findById(id)
        res.status(200).json(speech)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createSpeech = async (req, res) => {
    const { speech, name } = req.body
    const newSpeech = new Speech({ speech, name, creator: req.userId, createdAt: new Date().toISOString() })
    console.log(newSpeech);
    try {
        await newSpeech.save()
        res.status(201).json(newSpeech)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateSpeech = async (req, res) => {
    const { id } = req.params
    const note = req.body

    if (!req.userId) return res.json({ message: "Unauthorized "})
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No note with that id')
    try {
        const updatedNote = await Speech.findByIdAndUpdate(id, note)
        res.status(200).json(updatedNote)        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteSpeech = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No note with that id')
    try {
        const res = await Speech.findByIdAndDelete(id)
        
        res.status(200).json({ message: 'The item got successfully deleted', error: false })  
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const authTest = async (req, res) => {
    console.log("body", req.body);
}