import * as api from '../api/index.js'
import { FETCH_ALL, CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, FETCH_SPEECH } from '../constants/actionTypes.js';

export const getSpeeches = () => async (dispatch) => {
    try {
        const { data } = await api.fetchSpeeches()
        dispatch({ type: FETCH_ALL, payload: data }) ;
    } catch (error) {
        console.log(error.message);
    }
}

export const getSpeech = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchSpeech(id)
        dispatch({ type: FETCH_SPEECH, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const createSpeech = (speech) => async (dispatch) => {
    try {
        const { data } = await api.createSpeech(speech)
        console.log(data);
        dispatch({ type: CREATE_NOTE, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const editSpeech = (id, newSpeech) => async (dispatch) => {
    try {
        const { data } = await api.editSpeech(id, newSpeech)
        console.log(data);
        dispatch({ type: UPDATE_NOTE, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteSpeech = (id) => async (dispatch) => {
    try {
        console.log('note is deleted');
        await api.deleteSpeech(id)
        dispatch({ type: DELETE_NOTE, payload: id })
    } catch (error) {
        console.log(error.message);
    }
}

