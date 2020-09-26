import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button } from 'react-native-elements';
import { types } from './ProjectListScreen'

export default function EditProjectScreen({ navigation, route }) {

  const [project_title, setName] = useState(route.params.projectName)
  const [pattern_name, setPattern] = useState(route.params.patternName)

  const editedProject = (project_title, pattern_name) => (
    { id: route.params.id, projectName: project_title, patternName: pattern_name, imgreq: route.params.imgreq})

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>

      <View style={styles.inputcontainer}>
      <Text>{'Title: '}</Text><Input value={project_title} onChangeText={(value) => setName(value)}/>
      <Text>{'Pattern: '}</Text><Input value={pattern_name} onChangeText={(value) => setPattern(value)}/>

      <Button icon={ <Icon type='ionicon' name="ios-checkmark-circle-outline"/>} title="Save"
      onPress={() => {
        navigation.navigate('ProjectListScreen', {action_type: types.MODIFY, projectobj: editedProject(project_title, pattern_name)}); 
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
  inputcontainer: {
    height: 150,
  },
  image: {
    height: undefined,
    width: undefined,
  },
});