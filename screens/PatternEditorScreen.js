import React, { Component, useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import Canvas, { Image as CanvasImage, ImageData } from 'react-native-canvas';
import {Image as RNimage} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

export default function PatternEditorScreen() {
  
  const [stateimg, setImage] = useState(null);
      
  let canimage = null;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function handleCanvas(canvas){

    if (!(canvas instanceof Canvas))
      return;

    console.log("handleCanvas")
    console.log(stateimg)
    const imguri = RNimage.resolveAssetSource(require('../assets/watermelon-duck-outline.png')).uri;
    console.log(imguri)
    if (stateimg){
      canimage = new CanvasImage(canvas, 500, 500);
      console.log("stateimg valid, setting")
      canimage.src = stateimg;
    }
    else
      return;
    console.log("set")
    
    canimage.addEventListener('load', () => {
      console.log("loaded")
      const context = canvas.getContext('2d');
    context.drawImage(canimage, 0, 0);
    if (stateimg)  {
      //let outlineLayerData = context.getImageData(0, 0, 500, 500);
      //console.log(outlineLayerData.data[0])
    }
    });
  }

  return (
    <React.Fragment>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {stateimg && <RNimage source={{ uri: stateimg }} style={{ width: 200, height: 200 }} />}
    </View>
    <Canvas ref={handleCanvas}/>
    </React.Fragment>
  );
}