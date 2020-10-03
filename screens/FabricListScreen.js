import React, { useReducer, useEffect } from 'react';
import { FlatList, Image, Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

export const fabricInitialState = {
  inventory: [
    { id: '0', name: 'Sloths', width: 60, yardage: 2, yardfrac: '', type: 'twill', fiber: 'cotton', imgreq: require('../assets/sloth.jpg') },
    { id: '1', name: 'Waves', width: 45, yardage: 5, yardfrac: '', type: 'satin', fiber: 'polyester', imgreq: require('../assets/waves.jpg') },
  ],
}
export const types = {
  ADD: 'ADD',
  MODIFY: 'MODIFY',
}

const actionCreators = {
    add: (fabric) => ({type: types.ADD, payload: fabric}),
    modify: (fabric) => ({type: types.MODIFY, payload: fabric}),
}

export function reducer(state, action) {
  switch (action.type) {
    case types.ADD: {
      if (state.inventory.every((item) => item.id !== action.payload.id))
      return { ...state, inventory: [...state.inventory, action.payload] }
    }
    case types.MODIFY:
      return { ...state, inventory: state.inventory.map((item) => item.id === action.payload.id ? action.payload : item)}
  }
}

export default function FabricListScreen({ navigation, route }) {

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),});
  const [state, dispatch] = useReducer(reducer, fabricInitialState)
  useEffect(() => {
    if (route.params) {
      switch (route.params.action_type) {
        case types.ADD:
          dispatch(actionCreators.add(route.params.fabricobj));
        case types.MODIFY: 
          dispatch(actionCreators.modify(route.params.fabricobj));
      }
    }
  }, [route.params]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
      data={state.inventory}
      renderItem={( { item }) => {
        return (
        <TouchableOpacity style={styles.listcontainer} onPress={() => { navigation.push('FabricScreen', item)}}>
        <Text style={styles.fabricdes}>
          <Text style={styles.fabricname}>{item.name}</Text>
          {"  " + item.yardage + " " + (item.yardfrac ? item.yardfrac + " " : "") + ((item.yardage || item.yardfrac) ? "yards " : "") 
          + ((item.fiber || item.type) && (item.yardage || item.yardfrac) ? "of " : "") 
          + ((item.fiber || item.type) ? (item.fiber + " " + item.type) : "")}
        </Text>
        <Image resizeMode='cover' style={styles.image} source={item.imgreq}/>
        </TouchableOpacity>
      )}}
      keyExtractor={(item) => item.id}
      />
      <Icon type='ionicon' name='ios-add-circle' color='#4f99e3' size={75} containerStyle={styles.addicon}
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
    height: 170,
  },
  addicon: {
    padding: 10,
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  fabricdes: {
    padding: 15,
    backgroundColor: '#e9f2f5',
    fontFamily: 'Proxima',
    fontSize: 15,
    textTransform: 'lowercase',
  },
  fabricname: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  image: {
    height: 117,
    width: Dimensions.get('window').width,
  },
});