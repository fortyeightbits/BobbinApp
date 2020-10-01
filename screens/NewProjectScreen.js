import React, { useState, useContext, useReducer } from 'react';
import { Image, View, StyleSheet, Picker } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Icon, Button } from 'react-native-elements';
import { types } from './ProjectListScreen'
import NotionList from '../components/NotionList'
import { reducer, initialState, actionCreators } from '../components/NotionList'
//import MyContext from '../navigation/ProjectNav'

const randomId = () => Math.random().toString()

export default function NewProjectScreen({ navigation, route }) {

  const createProject = (project_title, pattern_name, notionlist) => (
    { id: randomId(), projectName: project_title, patternName: pattern_name, notions: notionlist, imgreq: [require('../assets/line.png')]})
    const editedProject = (project_title, pattern_name, notionlist) => (
      { id: route.params.id, projectName: project_title, patternName: pattern_name, notions: notionlist, imgreq: route.params.imgreq})

  //const data = React.useContext(MyContext);

  const [state, dispatch] = useReducer(reducer, (route.params ? ({list: route.params.notions}) : initialState))
  const [project_title, setName] = useState(route.params ? (route.params.projectName) : '')
  const [pattern_name, setPattern] = useState(route.params ? (route.params.patternName) : '')
  const [notion, setNotion] = useState('')
  //const [selected_fabric, setSelectedFabric] = useState('');

  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  //console.log(data)
  //let fabriclist = []
   // fabriclist = fabricInventory.map((fabric) => {
    //  console.log(fabric.name)
     // return <Picker.Item label={fabric.name} value={fabric.id}/>
    //})
/*   <Text>{"Fabrics: "}</Text>  
      <Picker
        selectedValue={selected_fabric}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setSelectedFabric(itemValue)}>
      </Picker>*/
  return (
    <View style={styles.container}>

      <View style={styles.inputcontainer}>
      <Input placeholder='Project Title' value={project_title} onChangeText={(value) => setName(value)}/>
      <Input placeholder='Pattern Name' value={pattern_name} onChangeText={(value) => setPattern(value)}/>
      <Input placeholder={'Add a notion and hit enter'} value={notion} onChangeText={(value) => setNotion(value)}
      onSubmitEditing={() => {
        if (!notion) return 
        dispatch(actionCreators.add(notion))
        setNotion('')}}/>
      <NotionList items={state.list} onPressItem={(id) => dispatch(actionCreators.delete(id))}/>

      <Button icon={ <Icon type='ionicon' name="ios-add-circle"/>} title="Save"
      onPress={() => {
        if (!route.params){
          navigation.navigate('ProjectListScreen', {action_type: types.ADD, projectobj: createProject(project_title, pattern_name, state.list)}); 
        }
        else {
        navigation.navigate('ProjectListScreen', {action_type: types.MODIFY, projectobj: editedProject(project_title, pattern_name, state.list)}); 
        }
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