import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

export default function PatternEditorScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pattern Editor</Text>
      <Image style={styles.image}
      source={require('../assets/watermelon-duck-outline.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});