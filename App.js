import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
