import React, { useReducer, useEffect } from 'react';
import { FlatList, Image, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';


export default function HomeScreen({ navigation, route}) {

  return (
    <View>
      <Text style={styles.headerTitleStyle}>{"Hello World"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  headerTitleStyle: {
    fontSize: 20,
    fontFamily: 'SpaceMono-Regular',
    padding: 20,
  },
});