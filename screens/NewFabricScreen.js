import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button } from 'react-native-elements';
import { types } from './FabricListScreen'

const randomId = () => Math.random().toString()

export default function NewFabricScreen({ navigation, route }) {

  const [fabric_name, setName] = useState(route.params ? (route.params.name) : '')
  const [fabric_width, setWidth] = useState(route.params ? (route.params.width) : '')
  const [fabric_yardage, setYardage] = useState(route.params ? (route.params.yardage) : '')
  const [fabric_type, setType] = useState(route.params ? (route.params.type) : '')
  const [fabric_fiber, setFiber] = useState(route.params ? (route.params.fiber) : '')

  const createFabric = (fabric_name, fabric_width, fabric_yardage, fabric_type, fabric_fiber) => (
    { id: randomId(), name: fabric_name, width: fabric_width, yardage: fabric_yardage, 
  type: fabric_type, fiber: fabric_fiber, imgreq: require('../assets/sloth.jpg')})
  const editedFabric = (fabric_name, fabric_width, fabric_yardage, fabric_type, fabric_fiber) => (
    { id: route.params.id, name: fabric_name, width: fabric_width, yardage: fabric_yardage, 
  type: fabric_type, fiber: fabric_fiber, imgreq: route.params.imgreq})

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>

      <View style={styles.inputcontainer}>
      <Input placeholder='Name' maxLength={20} value={fabric_name} onChangeText={(value) => setName(value)}/>
      <Input placeholder='Width' keyboardType="number-pad" value={fabric_width.toString()} onChangeText={(value) => setWidth(value)}/>
      <Input placeholder='Yardage' keyboardType="number-pad" value={fabric_yardage.toString()} onChangeText={(value) => setYardage(value)}/>
      <Input placeholder='Type' maxLength={15} alue={fabric_type} onChangeText={(value) => setType(value)}/> 
      <Input placeholder='Fiber' maxLength={15} value={fabric_fiber} onChangeText={(value) => setFiber(value)}/>
      <Button icon={ <Icon type='ionicon' name="ios-add-circle"/>} title="Add"
      onPress={() => {
        if (!route.params)
          navigation.navigate('FabricListScreen', {action_type: types.ADD, fabricobj: createFabric(fabric_name, fabric_width, fabric_yardage, fabric_type, fabric_fiber)}); 
        else
          navigation.navigate('FabricListScreen', {action_type: types.MODIFY, fabricobj: editedFabric(fabric_name, fabric_width, fabric_yardage, fabric_type, fabric_fiber)}); 
      }}
      />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  inputcontainer: {
    height: 150,
  },
  image: {
    height: undefined,
    width: undefined,
  },
});