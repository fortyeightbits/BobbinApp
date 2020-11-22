import React, { useReducer, useEffect, useState } from 'react'
import { SectionList, Image, Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font'
import { AppLoading } from 'expo'
import { bobbinDb } from './HomeScreen'

export const types = {
  ADD: 'ADD',
  MODIFY: 'MODIFY',
  DELETE: 'DELETE',
  COMPLETE: 'COMPLETE',
  UNCOMPLETE: 'UNCOMPLETE'
}

const actionCreators = {
  add: (proj) => ({ type: types.ADD, payload: proj }),
  modify: (proj) => ({ type: types.MODIFY, payload: proj }),
  delete: (id) => ({ type: types.DELETE, payload: id }),
  complete: (id) => ({ type: types.COMPLETE, payload: id }),
  uncomplete: (id) => ({ type: types.UNCOMPLETE, payload: id })
}

export function reducer (state, action) {
  switch (action.type) {
    case types.ADD: {
      if (state.projectlist[0].data.every((item) => item.id !== action.payload.id)) {
        const projobj = action.payload
        bobbinDb.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO projectTable (\
              project_id, \
              pattern_name,\
              project_title,\
              project_notions,\
              project_yards_narrow,\
              project_yard_frac_narrow, \
              project_yards_wide,\
              project_yard_frac_wide, \
              project_img, \
              project_complete) \
            VALUES (?,?,?,?,?,?,?,?,?,?)',
            [projobj.id, projobj.patternName, projobj.projectName, projobj.notions, projobj.yardagenarrow, projobj.yardfracnarrow, projobj.yardagewide, projobj.yardfracwide, 
              projobj.images, projobj.complete],
            (tx, results) => {},
            (tx, error) => { console.log(error) },       
          )
        })
        //return { ...state, projectlist: [...state.projectlist, state.projectlist[0].data: [...state.projectlist[0].data, action.payload]]}
        state.projectlist[0].data.push(action.payload)
        return { ...state }
      }
      break;
    }
    case types.MODIFY: {
      const projobj = action.payload
      bobbinDb.transaction(function (tx) {
        tx.executeSql(
          'UPDATE projectTable\
            SET pattern_name=?,\
            project_title=?,\
            project_notions=?,\
            project_yards_narrow=?,\
            project_yard_frac_narrow=?, \
            project_yards_wide=?,\
            project_yard_frac_wide=?, \
            project_img=?,\
            project_complete=? \
           WHERE project_id=?',
          [projobj.patternName, projobj.projectName, projobj.notions, projobj.yardagenarrow, projobj.yardfracnarrow, projobj.yardagewide, projobj.yardfracwide, 
            projobj.images, projobj.complete, projobj.id],
          (tx, results) => {},
          (tx, error) => {
            console.log(error)
          }
        )
      })
      state.projectlist[0].data = state.projectlist[0].data.map((item) => item.id === action.payload.id ? action.payload : item)
      state.projectlist[1].data = state.projectlist[1].data.map((item) => item.id === action.payload.id ? action.payload : item)
      return { ...state }
    }
    case types.DELETE: {
      bobbinDb.transaction(function (tx) {
        tx.executeSql(
          'DELETE FROM projectTable WHERE project_id = ?',
          [action.payload],
          (tx, results) => {
          }
        )
      })
      state.projectlist[0].data = state.projectlist[0].data.filter((item) => item.id !== action.payload)
      state.projectlist[1].data = state.projectlist[1].data.filter((item) => item.id !== action.payload)
      return { ...state }
    }
    case types.COMPLETE: {
      let tmp = state.projectlist[0].data.find((item) => item.id === action.payload);
      state.projectlist[0].data = state.projectlist[0].data.filter((item) => item.id !== action.payload);
      tmp.complete = 1;
      state.projectlist[1].data.push(tmp)
      bobbinDb.transaction(function (tx) {
        tx.executeSql(
          'UPDATE projectTable\
            SET project_complete=? \
           WHERE project_id=?',
          [1, action.payload],
          (tx, results) => {},
          (tx, error) => {
            console.log(error)
          }
        )
      })
      return { ...state };
    }
    case types.UNCOMPLETE: {
      let tmp = state.projectlist[1].data.find((item) => item.id === action.payload);
      state.projectlist[1].data = state.projectlist[1].data.filter((item) => item.id !== action.payload);
      tmp.complete = 0;
      state.projectlist[0].data.push(tmp)
      bobbinDb.transaction(function (tx) {
        tx.executeSql(
          'UPDATE projectTable\
            SET project_complete=? \
           WHERE project_id=?',
          [0, action.payload],
          (tx, results) => {},
          (tx, error) => {
            console.log(error)
          }
        )
      })
      return { ...state };
    }
  }
}

export default function ProjectListScreen ({ navigation, route }) {
  function projectInit (arg) {
    const createProject = (project_id, project_title, pattern_name, project_notions, project_yardage_narrow, 
      project_yard_frac_narrow, project_yardage_wide, project_yard_frac_wide, project_img, project_complete) => (
      {
        id: project_id,
        projectName: project_title,
        patternName: pattern_name,
        notions: project_notions,
        yardagenarrow: project_yardage_narrow,
        yardfracnarrow: project_yard_frac_narrow,
        yardagewide: project_yardage_wide,
        yardfracwide: project_yard_frac_wide,
        images: project_img,
        complete: project_complete
      })

    const projectInitialState = {
      projectlist: [
        {
          id: '0',
          title: 'Planned',
          data: []
        },
        {
          id: '1',
          title: 'Completed',
          data: []
        }
      ]
    }

    bobbinDb.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM projectTable',
        [],
        (tx, results) => {
          //console.log('projectInit results')
          //console.log(results)
          for (let i = 0; i < results.rows.length; i++) {
            const item = results.rows.item(i);
            if (!item.project_complete) {
              if (projectInitialState.projectlist[0].data.every((proj) => proj.id !== item.project_id)) {
                projectInitialState.projectlist[0].data.push(createProject(item.project_id, item.project_title, item.pattern_name, item.project_notions,
                  item.project_yards_narrow, item.project_yard_frac_narrow, item.project_yards_wide, item.project_yard_frac_wide, item.project_img, item.project_complete))
              }
            } else {
              if (projectInitialState.projectlist[1].data.every((proj) => proj.id !== item.project_id)) {
                projectInitialState.projectlist[1].data.push(createProject(item.project_id, item.project_title, item.pattern_name, item.project_notions,
                  item.project_yards_narrow, item.project_yard_frac_narrow, item.project_yards_wide, item.project_yard_frac_wide, item.project_img, item.project_complete))
              }
            }
          }
          setReady(true)
        },
        (tx, error) => console.log(error)
      )
    })
    return projectInitialState
  }

  const [state, dispatch] = useReducer(reducer, 0, projectInit)
  const [ready, setReady] = useState(false)

  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    Proxima: require('../assets/fonts/ProximaNova-Regular.otf')
  })

  useEffect(() => {
    if (route.params) {
      switch (route.params.action_type) {
        case types.ADD:
          dispatch(actionCreators.add(route.params.projectobj))
          break
        case types.MODIFY:
          dispatch(actionCreators.modify(route.params.projectobj))
          break
        case types.DELETE:
          dispatch(actionCreators.delete(route.params.projectid))
          break
        case types.COMPLETE:
          dispatch(actionCreators.complete(route.params.projectid))
          break
        case types.UNCOMPLETE:
          dispatch(actionCreators.uncomplete(route.params.projectid))
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

  return (
    <View style={styles.container}>
      <SectionList
        sections={state.projectlist}
        renderItem = {({item}) => {
          let imglist = []
          if (item.images) {
            const splitImg = item.images.split(",");
            imglist = splitImg.map((img, index) => {
              const numImg = (splitImg.length > 0 ? splitImg.length : 1);
              const lengthStyle = { width: Dimensions.get('window').width / (numImg <= 3 ? numImg : 1) }
              return <Image key={index.toString()} style={[styles.imgbox, lengthStyle]} resizeMode='cover' source={{ uri: img }}/>
            })
          }
          return (
          <TouchableOpacity onPress={() => { navigation.push('ProjectScreen', item) }} style={styles.touchable}>
            <View style={styles.listheading}>
              <Text style={styles.projectname}>{item.projectName}{item.projectName && item.patternName ? " | " : ""}
                {item.patternName}
              </Text>
            </View>
            <View style={styles.flexrow}>{imglist}</View>
          </TouchableOpacity> 
          )
        }}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        keyExtractor={(item) => item.id}
      />

      <Icon
        type='ionicon' name='ios-add-circle' color='#4f99e3' size={75} containerStyle={styles.addicon}
        onPress={() => {
          navigation.push('NewProjectScreen')
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
  touchable: {
    marginBottom: 1,
  },
  header: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#4f99e3',
    color: 'white',
  },
  addicon: {
    padding: 10,
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  imagerow: {
    flexDirection: 'row'
  },
  imgbox: {
    height: 180
  },
  listheading: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  projectname: {
    fontFamily: 'Proxima',
    fontSize: 18,
    textTransform: 'capitalize',
    flexWrap: 'wrap',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  image: {
    height: undefined,
    width: undefined
  }
})
