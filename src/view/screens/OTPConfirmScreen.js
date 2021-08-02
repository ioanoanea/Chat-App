import * as React from 'react';
import {StyleSheet, View} from "react-native";
import {fonts} from "../../../assets/fonts/fonts";
import {colors} from "../../../assets/colors/colors";
import MText from "../components/MText";
import MTextInput from "../components/MTextInput";
import MButton from "../components/MButton";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import {firebaseConfig} from "../../firebase_config/firebaseConfig";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {confirmVerificationCode, verifyNumber} from "../../actions/auth/authActions";

function OTPConfirmScreen(props) {

    const [verificationCode, setVerificationCode] = React.useState();

    const recaptchaVerifier = React.useRef(null);
    const attemptInvisibleVerification = false;

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={attemptInvisibleVerification}
            />
            <MText
                style={styles.infoText}
                fontSize={22}
                fontFamily={fonts.LATO_LIGHT}
                text="Verification code"
            />
            <MTextInput
                style={styles.inputBox}
                placeholder="123456"
                onChangeText={verificationCode => setVerificationCode(verificationCode)}
            />
            <MButton
                style={styles.connectButton}
                text="Connect"
                onPress={() => props.confirmVerificationCode(props.verificationId, verificationCode)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        justifyContent: 'center',
        paddingHorizontal: '10%',
        paddingTop: 50,
    },
    infoText: {
        marginBottom: 18,
        color: colors.TEXT_ACCENT,
    },
    inputBox: {
        marginBottom: 20,
    },
    connectButton: {
        width: '100%',
        alignSelf: 'center',
    }
});

const mapStateToProps = (appStore) => ({
    loading: appStore.auth.loading,
    verificationId: appStore.auth.verificationId,
    error: appStore.auth.error
});

const mapDispatchProps = (dispatch) => bindActionCreators({confirmVerificationCode}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(OTPConfirmScreen);

