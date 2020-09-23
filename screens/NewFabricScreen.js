import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button } from 'react-native-elements';

const temp = { id: '2', name: 'Fabric 3', width: 60, yardage: 2, type: 'twill', fiber: 'cotton', imgreq: require('../assets/sloth.jpg') }

const randomId = () => Math.random().toString()
const createFabric = (fabric_name, fabric_width, fabric_yardage, fabric_type, fabric_fiber) => (
  { id: randomId(), name: fabric_name, width: fabric_width, yardage: fabric_yardage, 
type: fabric_type, fiber: fabric_fiber, imgreq: require('../assets/sloth.jpg')})

export default function NewFabricScreen({ navigation, route }) {

  const [fabric_name, setName] = useState('')
  const [fabric_width, setWidth] = useState('')
  const [fabric_yardage, setYardage] = useState('')
  const [fabric_type, setType] = useState('')
  const [fabric_fiber, setFiber] = useState('')

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
      <Input placeholder='Name' value={fabric_name} onChangeText={(value) => setName(value)}/>
      <Input placeholder='Width' value={fabric_width} onChangeText={(value) => setWidth(value)}/>
      <Input placeholder='Yardage' value={fabric_yardage} onChangeText={(value) => setYardage(value)}/>
      <Input placeholder='Type' value={fabric_type} onChangeText={(value) => setType(value)}/> 
      <Input placeholder='Fiber' value={fabric_fiber} onChangeText={(value) => setFiber(value)}/>
      <Button icon={ <Icon type='ionicon' name="ios-add-circle"/>} title="Add"
      onPress={() => {
        navigation.navigate('HaberdasheryScreen', createFabric(fabric_name, fabric_width, fabric_yardage, fabric_type, fabric_fiber)); 
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