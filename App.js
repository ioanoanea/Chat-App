import React from 'react';
import LogInScreen from "./src/view/screens/LogInScreen";
import firebase from "firebase";
import {firebaseConfig} from "./src/firebase_config/firebaseConfig";
import {Provider} from "react-redux";
import {appStore} from "./src/store/appStore";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import OTPConfirmScreen from "./src/view/screens/OTPConfirmScreen";


const Stack = createStackNavigator();

export default function App() {

  // initialize firebase app
  if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

    return <Provider store={appStore}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LogIn">
                <Stack.Screen name="LogIn" component={LogInScreen} options={{headerShown: false}}/>
                <Stack.Screen name="OTPConfirm" component={OTPConfirmScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>;
}
