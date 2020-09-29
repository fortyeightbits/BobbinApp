import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import FabricListScreen from '../screens/FabricListScreen'
import NewFabricScreen from '../screens/NewFabricScreen'
import FabricScreen from '../screens/FabricScreen'

const Stack = createStackNavigator();

export default function FabricNav({ navigation, route}) {

  return (
      <Stack.Navigator>  
      <Stack.Screen name="FabricListScreen" 
        options={{
        title: 'Fabrics',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'SpaceMono-Regular', },
        }}
        component={FabricListScreen} />
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
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});