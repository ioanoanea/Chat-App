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
import {checkUserRegistered, registerUser, verifyNumber} from "../../actions/auth/authActions";

function LogInScreen(props) {

    // phone number state
    const [phoneNumber, setPhoneNumber] = React.useState();

    const recaptchaVerifier = React.useRef(null);
    const attemptInvisibleVerification = false;

    if (props.verificationId != null) {
        props.navigation.navigate("OTPConfirm");
    }

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
                text="Phone number"
            />
            <MTextInput
                style={styles.inputBox}
                placeholder="+40 712 345 678"
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
            <MButton
                style={styles.connectButton}
                text="Connect"
                onPress={() => {
                    // props.verifyNumber(phoneNumber, recaptchaVerifier);
                    props.registerUser('1_test', 'test1');
                }}
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
    verificationId: appStore.auth.verificationId,
    loading: appStore.auth.loading,
    error: appStore.auth.error
});

const mapDispatchProps = (dispatch) => bindActionCreators({verifyNumber, checkUserRegistered, registerUser}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(LogInScreen);

