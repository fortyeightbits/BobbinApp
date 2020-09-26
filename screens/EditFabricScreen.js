import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button } from 'react-native-elements';
import { types } from './HaberdasheryScreen'

export default function EditFabricScreen({ navigation, route }) {

  const [fabric_name, setName] = useState(route.params.name)
  const [fabric_width, setWidth] = useState(route.params.width)
  const [fabric_yardage, setYardage] = useState(route.params.yardage)
  const [fabric_type, setType] = useState(route.params.type)
  const [fabric_fiber, setFiber] = useState(route.params.fiber)

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
      <Text>{'Name: '}</Text><Input value={fabric_name} onChangeText={(value) => setName(value)}/>
      <Text>{'Width: '}</Text><Input value={fabric_width.toString()} onChangeText={(value) => setWidth(value)}/>
      <Text>{'Yardage: '}</Text><Input value={fabric_yardage.toString()} onChangeText={(value) => setYardage(value)}/>
      <Text>{'Type: '}</Text><Input value={fabric_type} onChangeText={(value) => setType(value)}/> 
      <Text>{'Fiber: '}</Text><Input value={fabric_fiber} onChangeText={(value) => setFiber(value)}/>
      <Button icon={ <Icon type='ionicon' name="ios-checkmark-circle-outline"/>} title="Save"
      onPress={() => {
        navigation.navigate('HaberdasheryScreen', {action_type: types.MODIFY, fabricobj: editedFabric(fabric_name, fabric_width, fabric_yardage, fabric_type, fabric_fiber)}); 
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