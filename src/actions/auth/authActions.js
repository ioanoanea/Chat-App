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
            //dispatch(onAuthSuccess(credential));
            dispatch = checkUserRegistered();
        } catch (err) {
            dispatch(onAuthFail(err));
            alert(err);
        }
    });
}

export function checkUserRegistered() {
    return ((dispatch) => {
        firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot != null){
                    let user = snapshot.docs.map(doc => {
                        const id = doc.id;
                        const data = doc.data;
                    });
                    dispatch(onAuthSuccess(user));
                    alert("success");
                } else {
                    dispatch(onAuthFail("user does not exists!"));
                    alert("user does not exists!");
                }
            });
    })
}
