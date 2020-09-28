import React, { useReducer, useEffect } from 'react';
import { FlatList, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export const initialState = {
  inventory: [
    { id: '0', name: 'Fabric 1', width: 60, yardage: 2, type: 'twill', fiber: 'cotton', imgreq: require('../assets/sloth.jpg') },
    { id: '1', name: 'Fabric 2', width: 45, yardage: 5, type: 'satin', fiber: 'polyester', imgreq: require('../assets/waves.jpg') },
  ],
}

export const types = {
  ADD: 'ADD',
  MODIFY: 'MODIFY',
}

const actionCreators = {
    add: (x) => ({type: types.ADD, payload: x}),
    modify: (x) => ({type: types.MODIFY, payload: x}),
}

export function reducer(state, action) {
  switch (action.type) {
    case types.ADD: {
      if (state.inventory.every((item) => item.id !== action.payload.id))
      return { ...state, inventory: [...state.inventory, action.payload] } //sets state.inventory to [x]
    }
    case types.MODIFY:
      return { ...state, inventory: state.inventory.map((item) => item.id === action.payload.id ? action.payload : item)}
  }
}

export default function HaberdasheryScreen({ navigation, route }) {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (route.params) {
      switch (route.params.action_type) {
        case types.ADD:
          dispatch(actionCreators.add(route.params.fabricobj));
        case types.MODIFY: 
          dispatch(actionCreators.modify(route.params.fabricobj));
      }
      //dispatch with type ADD and payload fabricobj, given to reducer as actions.type and action.payload
      //dispatch(actionCreators.add(fabric_name, fabric_width, fabric_yardage, fabric_type, fabric_fiber)) 
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
      data={state.inventory}
      renderItem={( { item }) => {
        return (
        <TouchableOpacity style={styles.listcontainer} onPress={() => { navigation.push('FabricScreen', item)}}>
        <Text key={item.id} style={styles.row}>{item.name + ": " + item.yardage + " yards of " + item.fiber + " " + item.type}</Text>
          <Image resizeMode='cover' source={item.imgreq}/>
          </TouchableOpacity>
      )}}
      keyExtractor={(item) => item.id}
      />

      <Icon type='ionicon' name='ios-add-circle-outline' color='powderblue' size={50}
      onPress={() => {
        navigation.push('NewFabricScreen');
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  listcontainer: {
    height: 150,
  },
  addicon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'powderblue',
    fontFamily: 'Proxima',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    height: undefined,
    width: undefined,
  },
});