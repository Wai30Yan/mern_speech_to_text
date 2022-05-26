import { FETCH_ALL, CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../constants/actionTypes.js';

export const speeches = (speeches = [], action) => {
    switch(action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE_NOTE:
            return [...speeches, action.payload];
        case UPDATE_NOTE:
            return speeches.map((speech) => speech._id === action.payload._id ? action.payload : speech)
        case DELETE_NOTE:
            return speeches.filter((speech) => speech._id !== action.payload);
        default:
            return speeches;
    }
}

// export const singleSpeech = (speech = {}, action) => {
//     switch(action.type) {
//         case FETCH_SPEECH:
//             return action.payload;
//         case UPDATE_NOTE:
//             return action.payload;
//         case DELETE_NOTE:
//             return [...speech];
//         default:
//             return speech;
//     }
// }