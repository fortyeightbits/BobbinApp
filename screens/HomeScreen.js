import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import * as SQLite from 'expo-sqlite';

export var bobbinDb = SQLite.openDatabase('BobbinDatabase.db');

export default function HomeScreen({ navigation, route}) {
  let [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Proxima': require('../assets/fonts/ProximaNova-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  // Create Fabrics table
  bobbinDb.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS fabricTable (        \
        fabric_id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        fabric_name VARCHAR(64) UNIQUE, \
        fabric_width INTEGER NOT NULL, \
        fabric_yardage INTEGER NOT NULL, \
        fabric_yard_frac VARCHAR(64) NOT NULL, \
        fabric_type VARCHAR(64) NOT NULL, \
        fabric_fiber VARCHAR(64) NOT NULL, \
        fabric_weight INTEGER NOT NULL, \
        )',
      [],
      // (tx, results) => {
      //   var len = results.rows.length;
      //   if (len > 0) {
      //     let res = results.rows.item(0);
      //     updateAllStates(res.user_name, res.user_contact, res.user_address);
      //   } else {
      //     alert('No user found');
      //     updateAllStates('', '', '');
      //   }
      // }
    );
  });
  
  // Create Notions table
  bobbinDb.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS notionTable (        \
        notion_id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        notion_name VARCHAR(64) UNIQUE, \
        notion_quantity INTEGER NOT NULL, \
        )',
      [],
    );
  });
 
  // Create Project table
  bobbinDb.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS projectTable (        \
        project_id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        pattern_name VARCHAR(64) NOT NULL, \
        project_title VARCHAR(64) UNIQUE, \
        project_yards INTEGER NOT NULL\
        )',
      [],
    );
  });
  
  // Create Project fabrics table
  bobbinDb.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS projectFabricsTable (        \
        project_id INTEGER,   \
        fabric_id INTEGER, \
        PRIMARY KEY (project_id, fabric_id), \
        FOREIGN KEY (project_id)\
            REFERENCES projectTable(project_id)\
                ON DELETE CASCADE \
                ON UPDATE NO ACTION\
        FOREIGN KEY (fabric_id)\
            REFERENCES fabricTable(fabric_id)\
                ON DELETE CASCADE \
                ON UPDATE NO ACTION\
        )',
      [],
    );
  });
  
  // Create Project notions table
  bobbinDb.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS projectNotionsTable(        \
        project_id INTEGER,   \
        notion_id INTEGER, \
        PRIMARY KEY (project_id, notion_id), \
        FOREIGN KEY (project_id)\
            REFERENCES projectTable(project_id)\
                ON DELETE CASCADE \
                ON UPDATE NO ACTION\
        FOREIGN KEY (notion_id)\
            REFERENCES notionTable(notion_id)\
                ON DELETE CASCADE \
                ON UPDATE NO ACTION\
        )',
      [],
    );
  });

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