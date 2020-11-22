import React from 'react';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export const initialState = {
  list: [],
}

export const types = {
  ADD: 'ADD',
  DELETE: 'DELETE',
}

const createItem = (name) => ({ id: randomId(), name })

const randomId = () => Math.random().toString()

export const actionCreators = {
    add: (x) => ({type: types.ADD, payload: createItem(x)}),
    delete: (id) => ({type: types.DELETE, payload: id}),
}

export function reducer(state, action) {
  switch (action.type) {
    case types.ADD: {
      if (state.list.every((item) => item.id !== action.payload.id))
      return { ...state, list: [...state.list, action.payload] }
    }
    case types.DELETE:
      return {...state, list: state.list.filter((item) => item.id !== action.payload),
      }
  }
}

export default function NotionList({ items, onPressItem }){

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View styles={styles.container}>
    <FlatList
      data={items} style={styles.flatlist} showsVerticalScrollIndicator={true} persistentScrollbar={true}
      renderItem={( { item }) => {
        return (
        <View style={styles.listcontainer}>
        <Text key={item.id}>{item.name}</Text>
        <Icon type='ionicon' name="ios-close" containerStyle={styles.icon} color='black' size={30} onPress={() => onPressItem(item.id)}/>
        </View>
      )}}
      keyExtractor={(item) => item.id}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex : 1, 
  },
  flatlist:{
    height: 40,
    flexGrow: 0,
    borderColor: 'white',
    marginBottom: 10,
  },
  icon:{
    paddingLeft: 10,
    paddingTop: -10,
  },
  listcontainer: {
    marginRight: 5,
    marginLeft: 10,
    flexDirection: 'row',
  },
  row: {
    fontFamily: 'Proxima',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
  }
});