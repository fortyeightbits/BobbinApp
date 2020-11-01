import React, { useReducer, useEffect, useState } from 'react';
import { SectionList, Image, Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { bobbinDb } from './HomeScreen'

export const types = {
  ADD: 'ADD',
  MODIFY: 'MODIFY',
  DELETE: 'DELETE',
  COMPLETE: 'COMPLETE',
}

const actionCreators = {
    add: (proj) => ({type: types.ADD, payload: proj}),
    modify: (proj) => ({type: types.MODIFY, payload: proj}),
    delete: (id) => ({type: types.DELETE, payload: id}),
    complete: (id) => ({type: types.COMPLETE, payload: id}),
}

export function reducer(state, action) {
  switch (action.type) {
    case types.ADD:{
      if (state.projectlist[0].data.every((item) => item.id !== action.payload.id)){
        console.log(action.payload)
        const projobj = action.payload;
        bobbinDb.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO projectTable (\
              project_id, \
              pattern_name,\
              project_title,\
              project_yards,\
              project_yard_frac, \
              project_img, \
              project_complete) \
            VALUES (?,?,?,?,?,?,?)',
            [projobj.id, projobj.projectName, projobj.patternName, projobj.yardage, projobj.yardfrac, projobj.images, projobj.complete],
            (tx, results) => {console.log("Added to table")},
            (tx, error) => {console.log(error)},            
          );
        });
        //return { ...state, projectlist: [...state.projectlist, state.projectlist[0].data: [...state.projectlist[0].data, action.payload]]}
        state.projectlist[0].data.push(action.payload)
        return {...state};
      }
      break;
    }
    case types.MODIFY:{
      state.projectlist[0].data.map((item) => item.id === action.payload.id ? action.payload : item);
      return {...state};
      //return { ...state, projectlist: state.projectlist.map((item) => item.id === action.payload.id ? action.payload : item)}
    }
    case types.DELETE: {
      bobbinDb.transaction(function (tx) {
        tx.executeSql(
          'DELETE FROM projectTable WHERE project_id = ?',
          [action.payload],
          (tx, results) => {
          }
        );
      });
      state.projectlist[0].data.filter((item) => item.id !== action.payload);
      return [...state];
      //return {...state, projectlist: state.projectlist.filter((item) => item.id !== action.payload)}
    }
    case types.COMPLETE:{
      return {...state};
    }
  }
}

export default function ProjectListScreen({ navigation, route }) {

  function projectInit(arg){

    const createProject = (project_id, project_title, pattern_name, project_yardage, proj_yard_frac, project_img, project_complete) => (
      { id: project_id, projectName: project_title, patternName: pattern_name, yardage: project_yardage, yardfrac: proj_yard_frac, images: project_img,
        complete: project_complete
    })

    let projectInitialState = {
      projectlist: [
        {
          id: '0',
          title: 'In Progress',
          data: [],
        },
        {
          id: '1',
          title: 'Completed',
          data: [],
        },
      ]
    }

    bobbinDb.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM projectTable',
        [],
        (tx, results) => {
          console.log('projectInit results');
          console.log(results)
          for (let i = 0; i < results.rows.length; i++)
          {
            let item = results.rows.item(i);
            if (!item.project_complete)
            {
              console.log("push to wip")
              if (projectInitialState.projectlist[0].data.every((proj) => proj.id !== item.project_id)) {
              projectInitialState.projectlist[0].data.push(createProject(item.project_id, item.project_title, item.pattern_name, item.project_yardage, 
                item.proj_yard_frac, item.project_img, item.project_complete))
              }
            }
            else
            {
              console.log("push to complete")
              if (projectInitialState.projectlist[1].data.every((proj) => proj.id !== item.project_id)) {
              projectInitialState.projectlist[1].data.push(createProject(item.project_id, item.project_title, item.pattern_name, item.project_yardage, 
                item.proj_yard_frac, item.project_img, item.project_complete))
              }
            }
          }
          setReady(true);
        },
        (tx, error) => console.log(error)
      );
    })
    return projectInitialState;
  }

  const [state, dispatch] = useReducer(reducer, 0, projectInit)
  const [ready, setReady] = useState(false)

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),});

  useEffect(() => {
    if (route.params) {
      switch (route.params.action_type) {
        case types.ADD:
          dispatch(actionCreators.add(route.params.projectobj));
          break;
        case types.MODIFY: 
          dispatch(actionCreators.modify(route.params.projectobj));
          break;
        case types.DELETE:
          dispatch(actionCreators.delete(route.params.projectid));
          break;          
      }
    }
  }, [route.params]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if(!ready)
  {
    console.log("loading")
    return null;
  }

  return (
    <View style={styles.container}>
      <SectionList
      sections={state.projectlist}
      renderItem = {({item}) => {
        let imglist = [];
        if (item.images)
        {
          let splitImg = item.images.split(",");
          imglist = splitImg.map((img, index) => {
            const numImg = (splitImg.length > 0 ? splitImg.length : 1);
            const lengthStyle = {width: Dimensions.get('window').width/(numImg <= 3 ? numImg : 1)}
            return <Image key={index.toString()} style={[styles.imgbox, lengthStyle]} resizeMode='cover' source={{uri: img}}/>
          })
        }
        return (
        <TouchableOpacity onPress={() => { navigation.push('ProjectScreen', item)}}>
          <View style={styles.listheading}>
            <Text style={styles.projectname}><Text style={{fontWeight: 'bold'}}>{item.projectName}</Text>{item.projectName && item.patternName ? " | " : ""}
            {item.patternName}</Text>
          </View>
          <View style={styles.flexrow}>{imglist}</View>
        </TouchableOpacity> 
        )}}
      renderSectionHeader={({ section }) => (
        <Text>{section.title}</Text>
      )}
      keyExtractor={(item) => item.id}
      />

      <Icon type='ionicon' name='ios-add-circle' color='#4f99e3' size={75} containerStyle={styles.addicon}
      onPress={() => {
        navigation.push('NewProjectScreen');
      }}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  flexrow: {
    flexDirection: 'row',
  },
  addicon: {
    padding: 10,
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  imagerow: {
    flexDirection: 'row',
  },
  imgbox:{
    height: 180,
  },
  listheading: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#e9f2f5',
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
    width: '80%',
  },
  image: {
    height: undefined,
    width: undefined,
  },
});