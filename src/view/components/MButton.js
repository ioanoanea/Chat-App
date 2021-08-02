import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {colors} from "../../../assets/colors/colors";
import {fonts} from "../../../assets/fonts/fonts";
import {
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
    useFonts
} from "@expo-google-fonts/lato";
import AppLoading from "expo-app-loading";
import MText from "./MText";

function MButton ({ style, text, onPress, color = colors.ACCENT, }) {

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
        return <TouchableOpacity style={[{backgroundColor: color}, styles.button, style]} onPress={onPress}>
            <MText text={text} fontSize={24}/>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    button: {
        color: colors.WHITE,
        paddingVertical: 10,
        paddingHorizontal: 25,
        fontFamily: fonts.LATO_REGULAR,
        borderRadius: 50,
        alignItems: 'center',
    }
});

export default MButton;
