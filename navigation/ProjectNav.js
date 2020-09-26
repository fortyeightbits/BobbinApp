import React, { useReducer, useEffect } from 'react'
import { FlatList, Image, Text, View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ProjectListScreen from '../screens/ProjectListScreen'
import NewProjectScreen from '../screens/NewProjectScreen'
import ProjectScreen from '../screens/ProjectScreen'
import EditProjectScreen from '../screens/EditProjectScreen'

const Stack = createStackNavigator();

export default function ProjectNav({ navigation, route}) {

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
        title: 'New Project',
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
      <Stack.Screen name="EditProjectScreen" 
        options={{
        title: 'Edit Project',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular', },
        }}
        component={EditProjectScreen} />
      </Stack.Navigator>      
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});