import React from 'react'
import { Image, Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useFonts } from 'expo-font'
import { AppLoading } from 'expo'
import { Icon, Button } from 'react-native-elements'
import { types } from './ProjectListScreen'

export default function ProjectScreen ({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    Proxima: require('../assets/fonts/ProximaNova-Regular.otf')
  })

  let notionText = []
  if (route.params.notions) {
    notionText = route.params.notions.map((item, index) => <Text key={index.toString()}>{item.name}
      {index === (route.params.notions.length - 1) ? '' : ','}
    </Text>)
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }

  let projImg = []
  if (route.params.images) {
    const splitImg = route.params.images.split(',')
    projImg = splitImg.map((img, index) => {
      console.log(img)
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
        {route.params.yardage || route.params.yardfrac ? (
          <View style={styles.flexrow}>
            <Text style={styles.paramtext}>Yardage </Text>
            <Text style={styles.infotext}>{route.params.yardage + ' '}</Text>
            {route.params.yardfrac ? (
              <Text style={styles.infotext}>{route.params.yardfrac}</Text>) : []}
            <Text> yards</Text>
          </View>) : []}
        {route.params.notions.length ? (
          <View style={styles.flexrow}>
            <Text style={styles.paramtext}>Notions  </Text>
            <Text style={styles.infotext}>{notionText}</Text>
          </View>) : []}
      </View>

      <View style={styles.buttoncontainer}>
        <Button
          icon={<Icon type='ionicon' name='ios-create' containerStyle={styles.button} color='#4f99e3' />}
          type='outline' title='Edit' containerStyle={styles.button}
          onPress={() => {
            navigation.push('NewProjectScreen', route.params)
          }}
        />
        <Button
          icon={<Icon type='ionicon' name='ios-trash' containerStyle={styles.button} color='#4f99e3' />}
          type='outline' title='Delete' containerStyle={styles.button}
          onPress={() => {
            navigation.navigate('ProjectListScreen', { action_type: types.DELETE, projectid: route.params.id })
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    padding: 5
  },
  buttoncontainer: {
    padding: 10
  },
  paramtext: {
    fontFamily: 'Proxima',
    fontSize: 20,
    marginRight: 40
  },
  notiontext: {
    width: Dimensions.get('window').width
  },
  infotext: {
    fontFamily: 'Proxima',
    fontSize: 15,
    paddingTop: 3,
    flex: 1,
    flexWrap: 'wrap'
  },
  flexrow: {
    flexDirection: 'row',
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
