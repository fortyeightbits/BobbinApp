import React from 'react'
import { Text, Image, ScrollView, View, StyleSheet, Dimensions } from 'react-native'
import { useFonts } from 'expo-font'
import { AppLoading } from 'expo'
import { Icon, Button } from 'react-native-elements'
import { types } from './ProjectListScreen'

export default function CompleteProjectScreen ({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    Proxima: require('../assets/fonts/ProximaNova-Regular.otf')
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  let projImg = []
  if (route.params.images) {
    const splitImg = route.params.images.split(',')
    projImg = splitImg.map((img, index) => {
      return <Image key={index.toString()} resizeMode='cover' style={[splitImg.length == 1 ? styles.singleimage : styles.image]} source={{ uri: img }} />
    })
  }

  return (
    <View>

    <ScrollView horizontal>
      {projImg}
    </ScrollView>

    <View style={styles.info}>
      {route.params.projectName ? (
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Name     </Text>
          <Text style={styles.infotext}>{route.params.projectName}</Text>
        </View>) : []}
      {route.params.patternName ? (
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Pattern   </Text>
          <Text style={styles.infotext}>{route.params.patternName}</Text>
        </View>) : []}
      <Text>[Placeholder for adjusting fabric yardage]</Text>
      <Text>[Placeholder for adding completion photos]</Text>
    </View>

    <Button 
      icon={<Icon type='ionicon' name="ios-checkmark-circle-outline" containerStyle={styles.button} color='#4f99e3'/>} 
      type="outline" title="Mark Completed" containerStyle={styles.button}
      onPress={() => {        
        navigation.navigate('ProjectListScreen', { action_type: types.COMPLETE, projectid: route.params.id }); 
      }}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flexrow: {
    flexDirection: 'row'
  },
  inputcontainer: {
    padding: 10
  },
  input: {
    fontFamily: 'Proxima',
    fontSize: 18
  },
  paramtext: {
    fontFamily: 'Proxima',
    fontSize: 15,
    paddingLeft: 10
  },
  infotext: {
    fontFamily: 'Proxima',
    fontSize: 15,
    paddingTop: 3,
    flex: 1,
    flexWrap: 'wrap'
  },
  button: {
    padding: 5
  },
  image: {
    height: 300,
    width: 350
  },
  singleimage: {
    height: 300,
    width: Dimensions.get('window').width
  },
  info: {
    padding: 20
  }
})
