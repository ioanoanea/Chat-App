import {authActionTypes} from "./authActionTypes";
import firebase from "firebase";

export const onAuthStart = () => {
    return {
        type: authActionTypes.AUTH_START,
    };
}

export const onAuthSuccess = (user) => {
    return {
        type: authActionTypes.AUTH_SUCCESS,
        user: user,
    };
}

export const onAuthFail = (error) => {
    return {
        type: authActionTypes.AUTH_FAIL,
        error: error,
    };
}

export const onPhoneValidationInitialized = (verificationId) => {
    return {
        type: authActionTypes.PHONE_VALIDATION_INITIALIZED,
        verificationId: verificationId,
    };
}

export const logOut = () => {
    return {
        type: authActionTypes.LOG_OUT,
    };
}

/**
 * Verify phone number
 * @param phoneNumber
 * @param recaptchaVerifier
 * @returns {(function(*): Promise<void>)|*}
 */
export function verifyNumber(phoneNumber, recaptchaVerifier) {
    return (async (dispatch) => {
        // notify start authentication
        dispatch(onAuthStart());

        // star phone verification
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                "+40771603149",
                recaptchaVerifier.current
            );
            dispatch(onPhoneValidationInitialized(verificationId));
        } catch (err) {
            dispatch(onAuthFail(`Error: ${err.message}`));
            alert(err);
        }
    });
}

/**
 * Confirm verification code
 * @param verificationId
 * @param verificationCode
 * @returns {(function(*): Promise<void>)|*}
 */
export function confirmVerificationCode(verificationId, verificationCode) {
    return (async (dispatch) => {
        // notify start authentication
        dispatch(onAuthStart());

        // start verification code confirmation
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            //showMessage({text: 'Phone authentication successful 👍'});
            dispatch(onAuthSuccess(credential));
        } catch (err) {
            dispatch(onAuthFail(err));
            alert(err);
        }
    });
}

/**
 * Check if user is registered
 * @returns {(function(*): void)|*}
 */
export function checkUserRegistered() {
    return ((dispatch) => {
        firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    let user = {
                        id : snapshot.id,
                        username: snapshot.data().username,
                    }
                    dispatch(onAuthSuccess(user));
                    alert('success: user -> ' + user.username);
                } else {
                    dispatch(onAuthFail('user does not exists!'));
                }
            }).catch((error) => {
                dispatch(onAuthFail(error));
                alert(error);
        });
    });
}

/**
 * Register user
 * @param id
 * @param username
 * @returns {(function(*): void)|*}
 */
export function registerUser(id, username) {
    return ((dispatch) => {
       firebase
           .firestore()
           .collection("users")
           .doc(id)
           .set({
               username: username,
           })
           .then(() => {
               dispatch(onAuthSuccess(firebase.auth().currentUser));
               alert('success');
           }).catch((error) => {
               dispatch(onAuthFail(error));
               alert(error);
       });
    });
}
