import React, { useState } from 'react'
import { Image, Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font'
import { AppLoading } from 'expo'
import { Icon, Button, Overlay } from 'react-native-elements'
import { types } from './ProjectListScreen'

export default function ProjectScreen ({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    Proxima: require('../assets/fonts/ProximaNova-Regular.otf')
  })

  const [visible, setVisible] = useState(false)
  const [currImg, setImg] = useState('')
  const toggleOverlay = () => { setVisible(!visible) }

  let notionText = []
  if (route.params.notions) {
    let notionlist = route.params.notions.split(',');
    notionText = notionlist.map((item, index) => <Text key={index.toString()}>{item}{index === (notionlist.length - 1) ? '' : ', '}
    </Text>)
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }

  let projImg = []
  if (route.params.images) {
    const splitImg = route.params.images.split(',')
    projImg = splitImg.map((img, index) => {
      return (
      <TouchableOpacity onPress={()=> {toggleOverlay(); setImg(img);}}>
      <Image key={index.toString()} resizeMode='cover' style={[splitImg.length == 1 ? styles.singleimage : styles.image]} source={{ uri: img }} />
      </TouchableOpacity>
      )
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
            <Text style={styles.infotext}>{route.params.yardage + ' '}
            {route.params.yardfrac ? (
              <Text style={styles.infotext}>{route.params.yardfrac + ' '}</Text>) : []}
            yards</Text>
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
        {route.params.complete == 0 ? (
        <Button 
          icon={ <Icon type='ionicon' name="ios-checkmark" containerStyle={styles.button} color='#4f99e3'/>} 
          type="outline" title="Complete" containerStyle={styles.button}
          onPress={() => {
            navigation.push('CompleteProjectScreen', route.params); 
          }}
        />) : []}      
        <Button 
          icon={ <Icon type='ionicon' name="ios-trash" containerStyle={styles.button} color='#4f99e3'/>} 
          type="outline" title="Delete" containerStyle={styles.button}
          onPress={() => {
            navigation.navigate('ProjectListScreen', {action_type: types.DELETE, projectid: route.params.id}); 
          }}
        />
      </View>

    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ padding: 10, margin: 10 }}>
      <Image resizeMode='contain' style={styles.overlay} source={{ uri: currImg }} />
    </Overlay>

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
  overlay: {
    width: Dimensions.get('window').width,
    height: 400

  },
  info: {
    padding: 20
  }
})
