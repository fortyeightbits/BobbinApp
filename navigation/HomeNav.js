import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import FabricNav from '../navigation/FabricNav'
import ProjectNav from '../navigation/ProjectNav'
import HomeScreen from '../screens/HomeScreen'
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

const Stack = createStackNavigator();

export default function HomeNav({ navigation, route }) {

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),});
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Stack.Navigator>  
    <Stack.Screen name="HomeScreen" 
      options={{
      title: 'Bobbin',
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'SpaceMono-Regular', 
        textAlign: 'center',}
      }}
    component={HomeScreen} />
    <Stack.Screen name="FabricNav" 
      options={{
      title: 'Fabrics',
      headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'SpaceMono-Regular', },
      }}
      component={FabricNav} />      
    <Stack.Screen name="ProjectNav" 
      options={{
      title: 'Project List',
      headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'SpaceMono-Regular', },
      }}
      component={ProjectNav} />
    </Stack.Navigator> 
  )
}