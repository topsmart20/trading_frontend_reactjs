import { OPEN_MODAL, CLOSE_MODAL, DELETE_ACCOUNT } from '../constants';

const initialState = {
    isOpen: false,
    modalName: '',
    modalData: {}
}

export const modal = (state = initialState, action = {}) => {
    switch (action.type) {
        case OPEN_MODAL: 
            return { ...state, isOpen: true, modalName: action.payload.modalName, modalData: action.payload.modalData }
        case CLOSE_MODAL: 
            return initialState;
        case DELETE_ACCOUNT:
            return initialState;
        default:
            return state;
    }
}