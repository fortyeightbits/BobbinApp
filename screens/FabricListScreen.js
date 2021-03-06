import React, { useReducer, useEffect, useState } from 'react'
import { FlatList, Image, Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font'
import { AppLoading } from 'expo'
import { bobbinDb } from './HomeScreen'

export const types = {
  ADD: 'ADD',
  MODIFY: 'MODIFY',
  DELETE: 'DELETE'
}

const actionCreators = {
  add: (fabric) => ({ type: types.ADD, payload: fabric }),
  modify: (fabric) => ({ type: types.MODIFY, payload: fabric }),
  delete: (id) => ({ type: types.DELETE, payload: id })
}

export function reducer (state, action) {
  switch (action.type) {
    case types.ADD: {
      if (state.inventory.every((item) => item.id !== action.payload.id)) {
        const fabricobj = action.payload
        bobbinDb.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO fabricTable (\
              fabric_id, \
              fabric_name,\
              fabric_width,\
              fabric_yardage,\
              fabric_yard_frac,\
              fabric_type,\
              fabric_fiber,\
              fabric_weight, \
              fabric_img) \
            VALUES (?,?,?,?,?,?,?,?,?)',
            [fabricobj.id, fabricobj.name, fabricobj.width, fabricobj.yardage, fabricobj.yardfrac,
              fabricobj.type, fabricobj.fiber, fabricobj.weight, fabricobj.image],
            (tx, results) => {},
            (tx, error) => { console.log(error) }
          )
        })
        return { ...state, inventory: [...state.inventory, action.payload] }
      }
      break;
    }
    case types.MODIFY: {
      const fabricobj = action.payload
      bobbinDb.transaction(function (tx) {
        tx.executeSql(
          'UPDATE fabricTable\
            SET fabric_name=?,\
             fabric_width=?,\
             fabric_yardage=?,\
             fabric_yard_frac=?,\
             fabric_type=?,\
             fabric_fiber=?,\
             fabric_weight=?, \
             fabric_img=? \
           WHERE fabric_id=?',
          [fabricobj.name, fabricobj.width, fabricobj.yardage, fabricobj.yardfrac,
            fabricobj.type, fabricobj.fiber, fabricobj.weight, fabricobj.image, fabricobj.id],
          (tx, results) => {},
          (tx, error) => {
            console.log(error)
          }
        )
      })
      return { ...state, inventory: state.inventory.map((item) => item.id === action.payload.id ? action.payload : item) }
    }
    case types.DELETE: {
      bobbinDb.transaction(function (tx) {
        tx.executeSql(
          'DELETE FROM fabricTable WHERE fabric_id = ?',
          [action.payload],
          (tx, results) => {
          }
        )
      })
      return { ...state, inventory: state.inventory.filter((item) => item.id !== action.payload) }
    }
  }
}

export default function FabricListScreen ({ navigation, route }) {
  function fabricInit (arg) {
    const createFabric = (fabric_id, fabric_name, fabric_width, fabric_yardage, fabric_yard_frac, fabric_type, fabric_fiber, fabric_weight, fabric_img) => (
      {
        id: fabric_id,
        name: fabric_name,
        width: fabric_width,
        yardage: fabric_yardage,
        yardfrac: fabric_yard_frac,
        type: fabric_type,
        fiber: fabric_fiber,
        weight: fabric_weight,
        image: fabric_img
      })

    const fabricInitialState = {
      inventory: []
    }

    bobbinDb.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM fabricTable',
        [],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; i++) {
            const item = results.rows.item(i)
            if (fabricInitialState.inventory.every((fabric) => fabric.id !== item.fabric_id)) {
              fabricInitialState.inventory.push(createFabric(item.fabric_id, item.fabric_name, item.fabric_width, item.fabric_yardage, item.fabric_yard_frac,
                item.fabric_type, item.fabric_fiber, item.fabric_weight, item.fabric_img))
            }
          }
          setReady(true)
        },
        (tx, error) => console.log(error)
      )
    })
    return fabricInitialState
  }

  const [state, dispatch] = useReducer(reducer, 0, fabricInit)
  const [ready, setReady] = useState(false)

  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    Proxima: require('../assets/fonts/ProximaNova-Regular.otf')
  })

  useEffect(() => {
    if (route.params) {
      switch (route.params.action_type) {
        case types.ADD:
          dispatch(actionCreators.add(route.params.fabricobj))
          break
        case types.MODIFY:
          dispatch(actionCreators.modify(route.params.fabricobj))
          break
        case types.DELETE:
          dispatch(actionCreators.delete(route.params.fabricid))
          break
      }
    }
  }, [route.params])

  if (!fontsLoaded) {
    return <AppLoading />
  }

  if (!ready) {
    return null
  }

  //console.log('render')
  //console.log(state.inventory)
  return (
    <View style={styles.container}>
      <FlatList
        data={state.inventory}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => { navigation.push('FabricScreen', item) }} style={styles.touchable}>
              <Text style={styles.fabricdes}>
                <Text style={styles.fabricname}>{item.name + (item.name ? '  ' : '')}</Text>
                {item.yardage + (item.yardage ? ' ' : '') + (item.yardfrac ? item.yardfrac + ' ' : '') + ((item.yardage || item.yardfrac) ? 'yards ' : '') +
          ((item.fiber || item.type) && (item.yardage || item.yardfrac) ? 'of ' : '') +
          ((item.fiber || item.type) ? (item.fiber + ' ' + item.type) : '')}
              </Text>
              {item.image && <Image resizeMode='cover' style={styles.image} source={{ uri: item.image }} />}
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <Icon
        type='ionicon' name='ios-add-circle' color='#4f99e3' size={75} containerStyle={styles.addicon}
        onPress={() => {
          navigation.push('NewFabricScreen')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  touchable: {
    marginBottom: 1,
  },
  addicon: {
    padding: 10,
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  fabricdes: {
    padding: 15,
    fontFamily: 'Proxima',
    fontSize: 15,
    textTransform: 'lowercase',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  fabricname: {
    fontSize: 18,
    textTransform: 'capitalize'
  },
  image: {
    height: 117,
    width: Dimensions.get('window').width
  }
})
