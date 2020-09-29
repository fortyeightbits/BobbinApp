import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const initialState = {
  list: [
    { id: '0', name: 'Green thread' },
    { id: '1', name: '22" zipper' },
  ],
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

  return (
    <View>
    <FlatList
      data={items}
      renderItem={( { item }) => {
        return (
        <TouchableOpacity style={styles.listcontainer} onPress={() => onPressItem(item.id)}>
        <Text key={item.id} style={styles.row}>{item.name}</Text>
        </TouchableOpacity>
      )}}
      keyExtractor={(item) => item.id}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  listcontainer: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'powderblue',
  }
});