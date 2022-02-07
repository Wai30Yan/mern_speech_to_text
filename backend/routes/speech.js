import express from 'express'

import { getSpeeches, createSpeech, getSpeech, updateSpeech, deleteSpeech, authTest } from '../controllers/speech.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getSpeeches)
router.get('/:id', getSpeech)
router.post('/', auth, createSpeech)
router.patch('/:id', auth, updateSpeech)
router.delete('/:id', auth, deleteSpeech)

router.post('/test', auth, authTest)

export default router