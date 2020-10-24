import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Icon, Button } from 'react-native-elements';
import { types } from './FabricListScreen'

export default function FabricScreen({ navigation, route }) {

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Image resizeMode='cover' style={styles.image} source={{ uri: route.params.image }}/>
      <View style={styles.info}>
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Name   </Text>
          <Text style={styles.infotext}>{route.params.name}</Text></View>
        {route.params.width ? (
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Width   </Text> 
          <Text style={styles.infotext}>{route.params.width}</Text>
          <Text> inches</Text>
        </View> ) : []}
        {route.params.yardage || route.params.yardfrac ? (
          <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Length </Text> 
          <Text style={styles.infotext}>{route.params.yardage + " "}</Text>
          {route.params.yardfrac ? (
          <Text style={styles.infotext}>{route.params.yardfrac}</Text>) : []}
          <Text> yards</Text>
        </View> ) : []}
        {route.params.fiber ? (
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Fiber    </Text> 
          <Text style={styles.infotext}>{route.params.fiber}</Text>
        </View> ) : []}
        {route.params.type ? (
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Type     </Text> 
          <Text style={styles.infotext}>{route.params.type}</Text>
        </View> ) : []}
        {route.params.weight ? (
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Weight </Text> 
          <Text style={styles.infotext}>{route.params.weight}</Text>
          </View> ) : []}
      </View>
      <View style={styles.buttoncontainer}>
        <Button icon={ <Icon type='ionicon' name="ios-create" containerStyle={styles.button} color='#4f99e3'/>} 
          type="outline" title="Edit" containerStyle={styles.button}
        onPress={() => {
          navigation.push('NewFabricScreen', route.params); 
        }}
        />
        <Button icon={ <Icon type='ionicon' name="ios-trash" containerStyle={styles.button} color='#4f99e3'/>} 
          type="outline" title="Delete" containerStyle={styles.button}
        onPress={() => {
          navigation.navigate('FabricListScreen', {action_type: types.DELETE, fabricid: route.params.id}); 
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
  button:{
    padding: 5,
  },
  buttoncontainer:{
    padding: 10,
  },
  image: {
    height: 300,
    width: undefined,
  },
  paramtext:{
    fontFamily: 'Proxima',
    fontSize: 20,
    marginRight: 40,
  },
  infotext:{
    fontFamily: 'Proxima',
    fontSize: 15,
    paddingTop: 3,
  },
  info: {
    padding: 20,
  },
  flexrow: {
    flexDirection: 'row',
    padding: 5,
  },
  flexcol:{
    flexDirection: 'column',
  },
});