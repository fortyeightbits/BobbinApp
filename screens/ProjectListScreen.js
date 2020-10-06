import React, { useReducer, useEffect } from 'react';
import { FlatList, Image, Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

export const initialState = {
  projectlist: [
    { id: '0', projectName: 'The Cottagecore Dress', patternName: 'McCall\'s M7974', notions: [],
      imgreq: [require('../assets/line.png'), require('../assets/green.png') ] },
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
    case types.ADD:{
      if (state.projectlist.every((item) => item.id !== action.payload.id))
      return { ...state, projectlist: [...state.projectlist, action.payload] }
    }
    case types.MODIFY:
      return { ...state, projectlist: state.projectlist.map((item) => item.id === action.payload.id ? action.payload : item)}
  }
}

export default function ProjectListScreen({ navigation, route }) {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (route.params) {
      switch (route.params.action_type) {
        case types.ADD:
          dispatch(actionCreators.add(route.params.projectobj));
        case types.MODIFY: 
          dispatch(actionCreators.modify(route.params.projectobj));
      }
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
      data={state.projectlist}
      renderItem = {({item}) => {
        let imglist = []
        if(item.imgreq) {
           imglist = item.imgreq.map((img, index) => {
            const numImg = (item.imgreq.length > 0 ? item.imgreq.length : 1);
            const lengthStyle = {width: Dimensions.get('window').width/(numImg < 3 ? numImg : 1)} 
            return <Image key={index.toString()} style={[styles.imgbox, lengthStyle]} resizeMode='cover' source={img}/>
          })
        }
        return (
        <TouchableOpacity style={styles.listcontainer} onPress={() => { navigation.push('ProjectScreen', item)}}>
          <Text style={styles.projectname}><Text style={{fontWeight: 'bold'}}>{item.projectName}</Text>   {item.patternName}</Text>
        <View style={styles.imagerow}>
        {imglist}
        </View>
        </TouchableOpacity> 
        )}}
      keyExtractor={(item) => item.id}
      />

      <Icon type='ionicon' name='ios-add-circle' color='#4f99e3' size={75} containerStyle={styles.addicon}
      onPress={() => {
        navigation.push('NewProjectScreen');
      }}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  flexrow: {
    flexDirection: 'row',
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
  imagerow: {
    flexDirection: 'row',
  },
  imgbox:{
    height: 150,
  },
  projectname: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#e9f2f5',
    fontFamily: 'Proxima',
    fontSize: 15,
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