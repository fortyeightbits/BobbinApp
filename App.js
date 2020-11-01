import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeNav from './navigation/HomeNav'
import FabricNav from './navigation/FabricNav'
import ProjectNav from './navigation/ProjectNav'

const Drawer = createDrawerNavigator()

export default function App () {
  return (
    <NavigationContainer independent>
      <Drawer.Navigator>
        <Drawer.Screen
          name='HomeNav'
          options={{
            title: 'Home',
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'SpaceMono-Regular'
            }
          }}
          component={HomeNav}
        />

        <Drawer.Screen
          name='FabricNav'
          options={{
            title: 'Fabric List',
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'SpaceMono-Regular'
            }
          }}
          component={FabricNav}
        />

        <Drawer.Screen
          name='ProjectNav'
          options={{
            title: 'Projects',
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'SpaceMono-Regular'
            }
          }}
          component={ProjectNav}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
