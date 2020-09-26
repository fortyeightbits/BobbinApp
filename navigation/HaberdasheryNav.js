import React, { useReducer, useEffect } from 'react'
import { FlatList, Image, Text, View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HaberdasheryScreen from '../screens/HaberdasheryScreen'
import NewFabricScreen from '../screens/NewFabricScreen'
import FabricScreen from '../screens/FabricScreen'
import EditFabricScreen from '../screens/EditFabricScreen'

const Stack = createStackNavigator();

export default function HaberdasheryNav({ navigation, route}) {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>  
      <Stack.Screen name="HaberdasheryScreen" 
        options={{
        title: 'Haberdashery',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular', },
        }}
        component={HaberdasheryScreen} />
      <Stack.Screen name="NewFabricScreen" 
        options={{
        title: 'New Fabric',
        headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'SpaceMono-Regular', },
        }}
        component={NewFabricScreen} />
      <Stack.Screen name="FabricScreen" 
        options={{
        title: 'Fabric',
        headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'SpaceMono-Regular', },
        }}
        component={FabricScreen} />
      <Stack.Screen name="EditFabricScreen" 
        options={{
        title: 'Edit Fabric',
        headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'SpaceMono-Regular', },
        }}
        component={EditFabricScreen} />
      </Stack.Navigator>      
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});