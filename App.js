import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HaberdasheryScreen from './screens/HaberdasheryScreen'
import NewFabricScreen from './screens/NewFabricScreen';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

const Root = createStackNavigator()

export default function App() {

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('./assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('./assets/fonts/ProximaNova-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <NavigationContainer>
    <Root.Navigator>
      <Root.Screen name="HaberdasheryScreen" 
        options={{
        title: 'Haberdashery',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular',
        },
        }}
        component={HaberdasheryScreen} />
      <Root.Screen name="NewFabricScreen" 
        options={{
          title: 'New Fabric',
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'SpaceMono-Regular',
          },
          }}
          component={NewFabricScreen} />
    </Root.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});