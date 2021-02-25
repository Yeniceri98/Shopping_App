import React, { useState } from 'react';
import * as Font from 'expo-font';                          // Custom Font için ekledik  ----->  expo install expo-font
import AppLoading from 'expo-app-loading';                  // Custom Font kullanmak için ekledik  ----->  expo install expo-app-loading  
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './store/reducers/productsReducer';
import { ProductsNavigator } from './navigation/ShopNavigator';


// REDUX
const rootReducer = combineReducers({
    products: productsReducer,
})


const store = createStore(rootReducer);


// CUSTOM FONTS
const fetchFonts = () => {
    return Font.loadAsync({
        'Font-Regular': require('./assets/LibreBaskerville-Regular.ttf'),
        'Font-Bold': require('./assets/LibreBaskerville-Bold.ttf')
    })
}


export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading 
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={() => console.log(err)}
            />
        )
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <ProductsNavigator />
            </NavigationContainer>
        </Provider>
    );
}


// _____ İNDİRİLENLER _____
// React Navigation v5  ----->  yarn add @react-navigation/native
// Navigation Gesture Handling  ----->  expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// Stack Navigator ----->  yarn add @react-navigation/stack
// Tab Navigator  ----->  yarn add @react-navigation/bottom-tabs
// Drawer Navigator  ----->  yarn add @react-navigation/drawer
// Header Buttons  ----->  yarn add react-navigation-header-buttons  ----->  import { HeaderButton } from 'react-navigation-header-buttons';
// Redux  ----->  yarn add redux
// React Redux  ----->  yarn add react-redux
// Redux Dev Tool Extension  ----->  yarn add redux-devtools-extension  ----->  import { composeWithDevTools } from 'redux-devtools-extension';
// Custom Font  ----->  expo install expo-font
// AppLoading  ----->  expo install expo-app-loading
