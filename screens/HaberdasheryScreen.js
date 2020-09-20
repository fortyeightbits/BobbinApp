import * as React from 'react';
import { FlatList, Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

const items = [
  { id: '0', text: 'Fabric 1', img: './assets/watermelon-duck-outline.png' },
  { id: '1', text: 'Fabric 2' },
]

export default function HaberdasheryScreen() {

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>

      <View style={styles.titlecontainer}>
        <Text style={styles.title}>Haberdashery</Text>
      </View>

      <FlatList
      data={items}
      renderItem={( { item }) => (
        <Fragment>
        <Text style={styles.row}>{item.text}</Text>
        <Image style={styles.image} source={require(item.img)}/>
        </Fragment>
      )}
      keyExtractor={(item) => item.id}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'powderblue',
  },
  titlecontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontFamily: 'SpaceMono-Regular',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: 200,
    height: 50,
  },
});