import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HaberdasheryNav from '../navigation/HaberdasheryNav'
import ProjectNav from '../navigation/ProjectNav'
import HomeScreen from '../screens/HomeScreen'

const Stack = createStackNavigator();

export default function HomeNav({ navigation, route}) {

  return (
    <NavigationContainer independent={true}>
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
      <Stack.Screen name="HaberdasheryNav" 
        options={{
        title: 'Haberdashery',
        headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'SpaceMono-Regular', },
        }}
        component={HaberdasheryNav} />      
      <Stack.Screen name="ProjectNav" 
        options={{
        title: 'Project List',
        headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'SpaceMono-Regular', },
        }}
        component={ProjectNav} />
      </Stack.Navigator> 
    </NavigationContainer>
  )
}