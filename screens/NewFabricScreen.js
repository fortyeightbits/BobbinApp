import React, { useReducer } from 'react';
import { FlatList, Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Icon } from 'react-native-elements';

const types = {
  ADD: 'ADD',
}

const initialState = {
  inventory: [
    { id: '0', text: 'Fabric 1', imgreq: require('../assets/sloth.jpg') },
    { id: '1', text: 'Fabric 2', imgreq: require('../assets/waves.jpg') },
  ],
}

//const randomId = () => Math.random().toString()
const createFabric = () => ({ id: '3', text: 'Fabric 3', imgreq: require('../assets/sloth.jpg')})

const actionCreators = {
  add: () => ({ type: types.ADD, payload: createFabric() }),
}

function reducer(state, action) {
  switch (action.type) {
    case types.ADD:
      return { ...state, inventory: [...state.inventory, action.payload] } //sets state.inventory to [x]
  }
}

export default function HaberdasheryScreen() {

  const [state, dispatch] = useReducer(reducer, initialState)

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),
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
      data={state.inventory}
      renderItem={( { item }) => (
        <React.Fragment>
        <View style={styles.listcontainer}>
          <Text style={styles.row}>{item.text}</Text>
          <Image resizeMode='cover' source={item.imgreq}/>
        </View>
        </React.Fragment>
      )}
      keyExtractor={(item) => item.id}
      />
      <Icon type='ionicon' name='ios-add-circle-outline' color='powderblue' size={50}
      onPress={() => {
        dispatch(actionCreators.add()) //dispatch with type ADD and payload createFabric return val, 
        //given to reducer as actions.type action.payload
      }}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  listcontainer: {
    height: 150,
  },
  addicon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'powderblue',
    fontFamily: 'Proxima',
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
    height: undefined,
    width: undefined,
  },
});