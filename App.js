import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { AppLoading } from 'expo'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeNav from './navigation/HomeNav'
import HaberdasheryNav from './navigation/HaberdasheryNav'
import ProjectNav from './navigation/ProjectNav'

const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator>
      <Drawer.Screen name="HomeNav" 
        options={{
        title: 'Home',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular', },
        }}
      component={HomeNav} />

      <Drawer.Screen name="HaberdasheryNav" 
        options={{
        title: 'Haberdashery',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular', },
        }}
      component={HaberdasheryNav} />

        <Drawer.Screen name="ProjectNav" 
        options={{
        title: 'Projects',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular', },
        }}
        component={ProjectNav} />   
      </Drawer.Navigator>
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});
