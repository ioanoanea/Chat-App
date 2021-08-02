import React from "react";
import {StyleSheet, TextInput} from "react-native";
import {fonts} from "../../../assets/fonts/fonts";
import AppLoading from "expo-app-loading";
import {
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
    useFonts
} from "@expo-google-fonts/lato";
import {colors} from "../../../assets/colors/colors";

function MTextInput ({ style, placeholder, onChangeText })  {

    let [fontsLoaded] = useFonts({
        Lato_100Thin,
        Lato_300Light,
        Lato_400Regular,
        Lato_700Bold,
        Lato_900Black,
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return <TextInput
            style={[styles.input, style]}
            placeholderTextColr={colors.TEXT_ACCENT}
            placeholder={placeholder}
            onChangeText={onChangeText}
        />;
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.WHITE,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: '10%',
        fontSize: 18,
        borderRadius: 50,
        fontFamily: fonts.LATO_REGULAR,
        letterSpacing: 1.8,
    }
});

export default MTextInput;
