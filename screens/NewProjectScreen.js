import React, { useState, useReducer } from 'react'
import { Image, Text, View, StyleSheet, Picker, FlatList } from 'react-native'
import { useFonts } from 'expo-font'
import { AppLoading } from 'expo'
import * as ImagePicker from 'expo-image-picker'
import { Input, Icon, Button, Overlay } from 'react-native-elements'
import { types } from './ProjectListScreen'
import NotionList, { reducer, initialState, actionCreators } from '../components/NotionList'

const randomId = () => Math.random().toString()

export default function NewProjectScreen ({ navigation, route }) {

  const pickImage = async () => {
    if (project_img.length >= 5) { return }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1
    })

    if (!result.cancelled) {
      const list = [...project_img]
      list.push(result.uri)
      setImages(list)
    }
  }

  /* Convert notion string to array of objects */
  let fixedNotionList = []
  if (route.params && route.params.notions)
  {
    let idx = 0;
    route.params.notions.split(',').forEach( (notion) => {
      fixedNotionList.push({id: idx.toString(), name: notion}); idx++;
    });
  }

  const [project_title, setName] = useState(route.params && route.params.projectName ? (route.params.projectName) : '')
  const [pattern_name, setPattern] = useState(route.params && route.params.patternName ? (route.params.patternName) : '')
  const [state, dispatch] = useReducer(reducer, (route.params ? ({ list: fixedNotionList }) : initialState))
  const [project_yardage, setYardage] = useState(route.params && route.params.yardage ? (route.params.yardage) : '')
  const [proj_yard_frac, setYardPicker] = useState(route.params && route.params.yardfrac ? (route.params.yardfrac) : '')
  const [project_img, setImages] = useState(route.params && route.params.images ? (route.params.images.split(',')) : [])
  const [project_complete, setComplete] = useState(route.params ? (route.params.complete) : 0)
  const [notion, setNotion] = useState('')
  // const [selected_fabric, setSelectedFabric] = useState('');

  /* Error message overlay */
  const [visible, setVisible] = useState(false)
  const toggleOverlay = () => { setVisible(!visible) }

  const createProject = (project_title, pattern_name, notionlist, project_yardage, proj_yard_frac, project_img, project_complete) => (
    {
      id: randomId(),
      projectName: project_title,
      patternName: pattern_name,
      yardage: project_yardage,
      yardfrac: proj_yard_frac,
      notions: notionlist,
      images: project_img,
      complete: project_complete
    })
  const editedProject = (project_title, pattern_name, notionlist, project_yardage, proj_yard_frac, project_img, project_complete) => (
    {
      id: route.params.id,
      projectName: project_title,
      patternName: pattern_name,
      yardage: project_yardage,
      yardfrac: proj_yard_frac,
      notions: notionlist,
      images: project_img,
      complete: project_complete
    })

  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    Proxima: require('../assets/fonts/ProximaNova-Regular.otf')
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  // let fabriclist = []
  // fabriclist = fabricInventory.map((fabric) => {
  //  console.log(fabric.name)
  // return <Picker.Item label={fabric.name} value={fabric.id}/>
  // })
  /*   <Text>{"Fabrics: "}</Text>
      <Picker
        selectedValue={selected_fabric}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setSelectedFabric(itemValue)}>
      </Picker> */

  return (
    <View style={styles.container}>

      <View style={styles.inputcontainer}>
        <Text style={styles.paramtext}>Title</Text>
        <Input containerStyle={styles.input} value={project_title} onChangeText={(value) => setName(value)} />
        <Text style={styles.paramtext}>Pattern Name</Text>
        <Input containerStyle={styles.input} value={pattern_name} onChangeText={(value) => setPattern(value)} />
        <View style={styles.flexrow}>
          <Text style={styles.paramtext}>Fabric Yards</Text>
          <Text style={[styles.paramtext, { paddingLeft: 40 }]}>Fractions</Text>
        </View>
        <View style={styles.flexrow}>
          <Input
            containerStyle={[styles.input, { width: 128 }]} maxLength={4} keyboardType='number-pad'
            value={project_yardage.toString()} onChangeText={(value) => setYardage(value)}
          />
          <Picker
            selectedValue={proj_yard_frac} style={styles.yarddropdown} mode='dropdown'
            onValueChange={(itemValue) => setYardPicker(itemValue)}
          >
            <Picker.Item label='' value='' />
            <Picker.Item label='1/8' value='1/8' />
            <Picker.Item label='1/4' value='1/4' />
            <Picker.Item label='3/8' value='3/8' />
            <Picker.Item label='1/2' value='1/2' />
            <Picker.Item label='5/8' value='5/8' />
            <Picker.Item label='3/4' value='3/4' />
            <Picker.Item label='7/8' value='7/8' />
          </Picker>
        </View>
        <Text style={styles.paramtext}>Notions</Text>
        <Input
          style={styles.notioninput} placeholder='Add a notion and hit enter' value={notion} onChangeText={(value) => setNotion(value)}
          onSubmitEditing={() => {
            if (!notion) return
            dispatch(actionCreators.add(notion))
            setNotion('')
          }}
        />
        <NotionList items={state.list} onPressItem={(id) => dispatch(actionCreators.delete(id))} />

        <View style={styles.upload}>
          <FlatList
            data={project_img}
            keyExtractor={(item) => item}
            numColumns={5}
            renderItem={({ item }) => {
              return (
                <Image source={{ width: 65, height: 65, uri: item }} style={{ marginRight: 5 }} />
              )
            }}
          />
          <Button title='Add Image' onPress={pickImage} containerStyle={styles.uploadbutton} />
        </View>

        <Button
          icon={<Icon type='ionicon' name='ios-add-circle-outline' containerStyle={styles.button} color='#4f99e3' />}
          type='outline' title={route.params ? 'Save Project' : 'Add Project'} containerStyle={styles.button}
          onPress={() => {
            let joinedImg = ''
            if (project_img.length > 1) { joinedImg = project_img.join(',') } else { joinedImg = project_img[0] }
            let NotionList = []
            let joinedNotions = ''
            if (state.list.length > 1) {
              state.list.forEach( (notion) => {NotionList.push(notion.name)});
              joinedNotions = NotionList.join(',');
            } 
            else {
              joinedNotions = state.list[0].name;
            }

            if (project_title === '' && pattern_name === '') { toggleOverlay() } else if (!route.params) {
              navigation.navigate('ProjectListScreen', {
                action_type: types.ADD,
                projectobj: createProject(project_title, pattern_name, joinedNotions, project_yardage, proj_yard_frac, joinedImg, project_complete)
              })
            } else {
              navigation.navigate('ProjectListScreen', {
                action_type: types.MODIFY,
                projectobj: editedProject(project_title, pattern_name, joinedNotions, project_yardage, proj_yard_frac, joinedImg, project_complete)
              })
            }
          }}
        />
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ padding: 10, margin: 10 }}>
        <Text style={styles.paramtext}>Please give this project a title or pattern name!</Text>
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  uploadbutton: {
    marginLeft: 30,
    marginRight: 30
  },
  upload: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: '#4f99e3'
  },
  flexrow: {
    flexDirection: 'row'
  },
  inputcontainer: {
    padding: 10
  },
  notioninput: {
    borderWidth: 0,
    fontSize: 15,
    fontFamily: 'Proxima'
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
  button: {
    padding: 5
  },
  yarddropdown: {
    width: 120
  }
})
