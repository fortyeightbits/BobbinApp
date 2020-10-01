import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, Picker } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button, Overlay } from 'react-native-elements';
import { types } from './FabricListScreen'

const randomId = () => Math.random().toString()

export default function NewFabricScreen({ navigation, route }) {

  /* All the hooks but no pan */
  const [fabric_name, setName] = useState(route.params ? (route.params.name) : '')
  const [fabric_width, setWidth] = useState(route.params ? (route.params.width) : '')
  const [fabric_yardage, setYardage] = useState(route.params ? (route.params.yardage) : '')
  const [fabric_type, setType] = useState(route.params ? (route.params.type) : '')
  const [fabric_fiber, setFiber] = useState(route.params ? (route.params.fiber) : '')
  const [fabric_weight, setWeight] = useState(route.params ? (route.params.weight) : '')
  const [fabric_yard_frac, setYardPicker] = useState(route.params ? (route.params.yardfrac) : '')

  /* Error message overlay */
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {setVisible(!visible);};

  const createFabric = (fabric_name, fabric_width, fabric_yardage, fabric_yard_frac, fabric_type, fabric_fiber, fabric_weight) => (
    { id: randomId(), name: fabric_name, width: fabric_width, yardage: fabric_yardage, yardfrac: fabric_yard_frac,
  type: fabric_type, fiber: fabric_fiber, weight: fabric_weight, imgreq: require('../assets/sloth.jpg')})
  const editedFabric = (fabric_name, fabric_width, fabric_yardage, fabric_yard_frac, fabric_type, fabric_fiber, fabric_weight) => (
    { id: route.params.id, name: fabric_name, width: fabric_width, yardage: fabric_yardage, fabric_yardage, yardfrac: fabric_yard_frac,
  type: fabric_type, fiber: fabric_fiber, weight: fabric_weight, imgreq: route.params.imgreq})

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
        <Text style={styles.paramtext}>Name</Text>
        <Input containerStyle={styles.input} maxLength={30} value={fabric_name} onChangeText={(value) => setName(value)}/>
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Width [inches]</Text>
          <Text style={[styles.paramtext, {paddingLeft:60}]}>Yards</Text>
          <Text style={[styles.paramtext, {paddingLeft:40}]}>Fractions</Text>
        </View>
        <View style={styles.flexrow}>
          <Input containerStyle={styles.widthinput} maxLength={3} keyboardType="number-pad" value={fabric_width.toString()} onChangeText={(value) => setWidth(value)}/>
          <Input containerStyle={[styles.yardinput, {paddingLeft:55}]} maxLength={4} keyboardType="number-pad" value={fabric_yardage.toString()} onChangeText={(value) => setYardage(value)}/>
          <Picker
            selectedValue={fabric_yard_frac} style={styles.yarddropdown} mode='dropdown'
            onValueChange={(itemValue) => setYardPicker(itemValue)}>
          <Picker.Item label="0" value="0"/>
          <Picker.Item label="1/8" value="1/8" />
          <Picker.Item label="1/4" value="1/4" />
          <Picker.Item label="3/8" value="3/8" />
          <Picker.Item label="1/2" value="1/2" />
          <Picker.Item label="5/8" value="5/8" />
          <Picker.Item label="3/4" value="3/4" />
          <Picker.Item label="7/8" value="7/8" />
          </Picker>
        </View>
        <Text style={styles.paramtext}>Fiber</Text>
        <Input containerStyle={styles.input} maxLength={30} value={fabric_fiber} onChangeText={(value) => setFiber(value)}/>
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Weave/Type</Text>
          <Text style={[styles.paramtext, {paddingLeft:85}]}>Weight</Text>
        </View>
        <View style={styles.flexrow}>
          <Input containerStyle={styles.weaveinput} maxLength={20} value={fabric_type} onChangeText={(value) => setType(value)}/> 
          <Input containerStyle={styles.weaveinput} maxLength={15} value={fabric_weight} onChangeText={(value) => setWeight(value)}/> 
        </View>
        <Button icon={ <Icon type='ionicon' name="ios-add-circle-outline" containerStyle={styles.addicon} color='#4f99e3'/>} 
                type="outline" title="Save Fabric" containerStyle={styles.button}
        onPress={() => {
          if (fabric_name === '')
            toggleOverlay()
          else if (!route.params)
            navigation.navigate('FabricListScreen', {action_type: types.ADD, 
              fabricobj: createFabric(fabric_name, fabric_width, fabric_yardage, fabric_yard_frac, fabric_type, fabric_fiber, fabric_weight)}); 
          else
            navigation.navigate('FabricListScreen', {action_type: types.MODIFY, 
              fabricobj: editedFabric(fabric_name, fabric_width, fabric_yardage, fabric_yard_frac, fabric_type, fabric_fiber, fabric_weight)}); 
        }}
        />
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.paramtext}>Please give this fabric a name!</Text>
      </Overlay>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  button:{
    padding: 5,
  },
  addicon:{
    padding: 5,
  },
  inputcontainer: {
    padding: 10,
  },
  paramtext:{
    fontFamily: 'Proxima',
    fontSize: 18,
    paddingLeft: 10,
  },
  input:{
    fontFamily: 'Proxima',
  },
  flexrow: {
    flexDirection: 'row',
  },
  flexcol:{
    flexDirection: 'column',
  },
  widthinput:{
    width: 130,
    fontFamily: 'Proxima',
  },
  yardinput:{
    width: 128,
    fontFamily: 'Proxima',
  },
  yarddropdown:{
    width: 100,
  },
  weaveinput:{
    width: 185,
    fontFamily: 'Proxima',
  },
  image: {
    height: undefined,
    width: undefined,
  },
});