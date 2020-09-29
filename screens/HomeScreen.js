import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

export default function HomeScreen({ navigation, route}) {

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
      <Card.Title style={styles.headerTitleStyle}>Fabric Stash</Card.Title>
      <Card.Divider/>
      <Text style={styles.cardtext}>{"This should have a fabric count but I can't get context to work :( "}</Text>
      <Button
        type="outline" title='Go to Fabric List' buttonStyle={styles.button} titleStyle={styles.buttonText}
        onPress={() => navigation.push('FabricNav')}/>
      </Card>
      <Card>
      <Card.Title style={styles.headerTitleStyle}>Projects</Card.Title>
      <Card.Divider/>
      <Text style={styles.cardtext}>{"This should have a project count but I can't get context to work :( "}</Text>
      <Button
        type="outline" title='Go to Project List' titleStyle={styles.buttonText}
        onPress={() => navigation.push('ProjectNav')}/>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardtext: {
    fontFamily: 'Proxima',
    paddingBottom: 20,
  },
  buttonText: {
    fontFamily: 'Proxima',
  },
  headerTitleStyle: {
    fontSize: 18,
    fontFamily: 'Proxima',
  },
});