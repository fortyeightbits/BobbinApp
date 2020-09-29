import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button } from 'react-native-elements';

export default function FabricScreen({ navigation, route }) {

  return (
    <View style={styles.container}>
      <Image resizeMode='cover' style={styles.image} source={route.params.imgreq}/>
      <View style={styles.info}>
      <Text>{route.params.name}</Text>
      <Text>{route.params.width}</Text>
      <Text>{route.params.yardage}</Text>
      <Text>{route.params.type}</Text>
      <Text>{route.params.fiber}</Text>
      </View>
      <Button icon={ <Icon type='ionicon' name="ios-create"/>} title="Edit"
      onPress={() => {
        navigation.push('NewFabricScreen', route.params); 
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  image: {
    height: 300,
    width: undefined,
  },
  info: {
    padding: 20,
  }
});