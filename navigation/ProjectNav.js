import React, {useState} from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ProjectListScreen from '../screens/ProjectListScreen'
import NewProjectScreen from '../screens/NewProjectScreen'
import ProjectScreen from '../screens/ProjectScreen'

const Stack = createStackNavigator();

//TODO: not working
//export const MyContext = React.createContext();

export default function ProjectNav() {

  //<MyContext.Provider value={"Hello"}>

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>  
      <Stack.Screen name="ProjectListScreen" 
        options={{
        title: 'Projects',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular', },
        }}
        component={ProjectListScreen} />
      <Stack.Screen name="NewProjectScreen" 
        options={{
        title: 'Modify Project',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular', },
        }}
        component={NewProjectScreen} />
      <Stack.Screen name="ProjectScreen" 
        options={{
        title: 'Project',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular', },
        }}
        component={ProjectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  //</MyContext.Provider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});