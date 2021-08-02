import {authActionTypes} from "../actions/auth/authActionTypes";

const initialState = {
    user: null,
    verificationId: null,
    loading: false,
    error: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            };
        case authActionTypes.AUTH_SUCCESS:
            return {
                ...state,
                user: action.user,
            };
        case authActionTypes.AUTH_FAIL:
            return  {
                ...state,
                error: action.error,
            };
        case authActionTypes.PHONE_VALIDATION_INITIALIZED:
            return {
                ...state,
                verificationId: action.verificationId,
            };
        default:
            return initialState;
    }
}
