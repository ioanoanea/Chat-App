import React from "react";
import {StyleSheet, Text} from "react-native";
import {colors} from "../../../assets/colors/colors";
import {fonts} from "../../../assets/fonts/fonts";
import AppLoading from 'expo-app-loading';
import {
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
    useFonts
} from "@expo-google-fonts/lato";

function MText ({ style, text, fontFamily = fonts.LATO_REGULAR, fontSize = 14 }) {

    let [fontsLoaded] = useFonts({
        Lato_100Thin,
        Lato_300Light,
        Lato_400Regular,
        Lato_700Bold,
        Lato_900Black,
    });

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return <Text style={[styles.text, style, {fontFamily: fontFamily, fontSize: fontSize}]}>{text}</Text>
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        color: colors.WHITE,
        fontFamily: fonts.LATO_REGULAR,
    }
});

export default MText;
