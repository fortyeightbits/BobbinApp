import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
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

  return (
    <View style={styles.container}>

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
      </View>

      <Button
        icon={<Icon type='ionicon' name='checkmark-circle-outline' containerStyle={styles.button} color='#4f99e3' />}
        type='outline' title='Mark Completed' containerStyle={styles.button}
        onPress={() => {
          navigation.navigate('ProjectListScreen', { action_type: types.MODIFY, projectid: route.params.id })
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
  }
})
