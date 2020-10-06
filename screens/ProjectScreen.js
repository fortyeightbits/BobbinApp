import React from 'react';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button } from 'react-native-elements';

export default function ProjectScreen({ navigation, route }) {

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),
  });

  let notionText = []
  if (route.params.notions)
    notionText = route.params.notions.map((item, index) => <Text key={index.toString()}>{item.name} 
    {index === (route.params.notions.length-1) ? "":","} </Text>)

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  //TODO image scrollview
  return (
    <View>
      <ScrollView horizontal> 
      <Image resizeMode='cover' style={styles.image} source={route.params.imgreq[0]}/>
      <Image resizeMode='cover' style={styles.image} source={route.params.imgreq[1]}/> 
      </ScrollView>
      <View style={styles.info}>
        {route.params.projectName ? (
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Name     </Text>
          <Text style={styles.infotext}>{route.params.projectName}</Text>
        </View> ) : []}
        {route.params.patternName ? (
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Pattern   </Text>
          <Text style={styles.infotext}>{route.params.patternName}</Text>
        </View> ) : []}
        {route.params.yardage || route.params.yardfrac ? (
          <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Yardage </Text> 
          <Text style={styles.infotext}>{route.params.yardage + " "}</Text>
          {route.params.yardfrac ? (
          <Text style={styles.infotext}>{route.params.yardfrac}</Text>) : []}
          <Text> yards</Text>
        </View> ) : []}
        {route.params.notions.length ? (
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Notions  </Text>
          <Text style={styles.infotext}>{notionText}</Text>
        </View> ) : []}
      </View>

      <View style={styles.buttoncontainer}>
        <Button icon={ <Icon type='ionicon' name="ios-create" containerStyle={styles.button} color='#4f99e3'/>} 
          type="outline" title="Edit" containerStyle={styles.button}
        onPress={() => {
          navigation.push('NewProjectScreen', route.params); 
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
  flexrow: {
    flexDirection: 'row',
    padding: 5,
  },
  image: {
    height: 300,
    width: 300,
  },
  info: {
    padding: 20,
  },
});