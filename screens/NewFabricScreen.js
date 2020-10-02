import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button, Overlay } from 'react-native-elements';
import { types } from './FabricListScreen'
import Autocomplete from 'react-native-autocomplete-input';

const randomId = () => Math.random().toString()
const typedatabase = ['Batik', 'Broadcloth', 'Canvas', 'Chiffon', 'Quilting cotton', 'Flannel', 'Fleece', 'Jersey', 'Lawn', 'Linen', 'Poplin', 'Crepe',
'Crepe de Chine', 'Voile', 'Batiste', 'Brocade', 'Challis', 'Chambray', 'Denim', 'Chenille', 'Corduroy', 'Dupioni', 'Eyelet', 'Muslin', 'Gabardine', 'Gauze',
'Lace', 'Lawn', 'Neoprene', 'Organza', 'Oxford', 'Satin', 'Sateen', 'Shantung', 'Tricot', 'Tulle', 'Twill', 'Velvet']

export default function NewFabricScreen({ navigation, route }) {

  /* All the hooks but no pan */
  const [fabric_name, setName] = useState(route.params ? (route.params.name) : '')
  const [fabric_width, setWidth] = useState(route.params ? (route.params.width) : '')
  const [fabric_yardage, setYardage] = useState(route.params ? (route.params.yardage) : '')
  const [fabric_type, setType] = useState(route.params ? (route.params.type) : '')
  const [fabric_fiber, setFiber] = useState(route.params ? (route.params.fiber) : '')
  const [fabric_weight, setWeight] = useState(route.params ? (route.params.weight) : '')
  const [fabric_yard_frac, setYardPicker] = useState(route.params ? (route.params.yardfrac) : '')
  const [filtered, setFiltered] = useState([]); //Autocomplete filtered data

  /* Error message overlay */
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {setVisible(!visible);};

  /* method called everytime when we change the value of the input */
  const findType = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      setFiltered(
          typedatabase.filter((type) => type.search(regex) >= 0)
      );
    } else 
      setFiltered([]);
  };

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
          <Input containerStyle={[styles.input, {width: 130}]} maxLength={3} keyboardType="number-pad" value={fabric_width.toString()} onChangeText={(value) => setWidth(value)}/>
          <Input containerStyle={[styles.input, {paddingLeft:55, width:128}]} maxLength={4} keyboardType="number-pad" value={fabric_yardage.toString()} onChangeText={(value) => setYardage(value)}/>
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
          <Autocomplete
            containerStyle={styles.accontainer} inputContainerStyle={styles.acinput}
            autoCapitalize='sentences' autoCorrect={false} data={filtered} defaultValue={fabric_type} 
            keyExtractor={(index) => index.toString()} onChangeText={(text) => {findType(text); setType(text)}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setType(item);
                  setFiltered([]);
                }}>
                <Text key={index.toString()}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <Input containerStyle={[styles.input, {width:185}]} maxLength={15} value={fabric_weight} onChangeText={(value) => setWeight(value)}/> 
        </View>
        <Button icon={ <Icon type='ionicon' name="ios-add-circle-outline" containerStyle={styles.button} color='#4f99e3'/>} 
                type="outline" title={route.params ? "Save Fabric" : "Add Fabric"} containerStyle={styles.button}
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
  temp:{
    backgroundColor: 'blue',
  },
  accontainer:{
    width: 180,
  },
  acinput:{
    borderBottomWidth: 1,
    borderColor: '#86939e',
    borderWidth: 0,
    backgroundColor: '#86939e',
  },
  button:{
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
  yarddropdown:{
    width: 100,
  },
  image: {
    height: undefined,
    width: undefined,
  },
});