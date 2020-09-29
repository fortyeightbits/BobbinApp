import React from 'react';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button } from 'react-native-elements';

export default function ProjectScreen({ navigation, route }) {

  let notionText = []
  if (route.params.notions)
    notionText = route.params.notions.map((item, index) => <Text key={index.toString()}>{item.name}</Text>)

  return (
    <View>
      <ScrollView horizontal>
      <Image resizeMode='cover' style={styles.image} source={route.params.imgreq[0]}/>
      <Image resizeMode='cover' style={styles.image} source={route.params.imgreq[1]}/>
      </ScrollView>
      <View style={styles.info}>
      <Text>{route.params.projectName}</Text>
      <Text>{route.params.patternName}</Text>
      {notionText}
      </View>
      <Button icon={ <Icon type='ionicon' name="ios-create"/>} title="Edit"
      onPress={() => {
        navigation.navigate('NewProjectScreen', route.params);
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  image: {
    height: 300,
    width: 300,
  },
  info: {
    padding: 20,
  }
});