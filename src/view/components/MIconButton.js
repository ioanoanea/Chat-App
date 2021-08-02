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
import {AntDesign} from "@expo/vector-icons";

function MIconButton ({ style, name, onPress, color = colors.ACCENT }) {

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
            <AntDesign name={name} size={32} color={colors.WHITE}/>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        color: colors.WHITE,
        fontFamily: fonts.LATO_REGULAR,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MIconButton;
