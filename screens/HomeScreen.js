import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { useFonts } from 'expo-font'
import { AppLoading } from 'expo'
import * as SQLite from 'expo-sqlite'
import { useIsFocused } from '@react-navigation/native'

export const bobbinDb = SQLite.openDatabase('BobbinDatabase.db')

export default function HomeScreen ({ navigation, route }) {
  const [fabricCnt, setFabricCnt] = useState(0)
  const [projCnt, setProjCnt] = useState(0)
  const [projDoneCnt, setProjDoneCnt] = useState(0)
  const isFocused = useIsFocused()

  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    Proxima: require('../assets/fonts/ProximaNova-Regular.otf')
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  // Create Fabrics table
  bobbinDb.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS fabricTable (        \
        fabric_id VARCHAR(64) UNIQUE,   \
        fabric_name VARCHAR(64) NOT NULL, \
        fabric_width VARCHAR(64) NOT NULL, \
        fabric_yardage VARCHAR(64) NOT NULL, \
        fabric_yard_frac VARCHAR(64) NOT NULL, \
        fabric_type VARCHAR(64) NOT NULL, \
        fabric_fiber VARCHAR(64) NOT NULL, \
        fabric_weight VARCHAR(64) NOT NULL, \
        fabric_img VARCHAR(64) \
        )',
      []
    )
  })

  /*
  bobbinDb.transaction((tx) => {
    tx.executeSql(
      'DROP TABLE IF EXISTS projectTable',[]
    )
  });
*/
  // Create Project table
  bobbinDb.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS projectTable (        \
        project_id VARCHAR(64) UNIQUE,   \
        pattern_name VARCHAR(64) NOT NULL, \
        project_title VARCHAR(64) NOT NULL, \
        project_notions VARCHAR(64), \
        project_yards VARCHAR(64) NOT NULL, \
        project_yard_frac VARCHAR(64) NOT NULL, \
        project_img VARCHAR(64), \
        project_complete INTEGER \
        )',
      []
    )
  })

  /*
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
*/

  if (isFocused) {
    bobbinDb.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM fabricTable',
        [],
        (tx, results) => {
          setFabricCnt(results.rows.length)
        },
        (tx, error) => console.log(error)
      )
    })

    bobbinDb.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM projectTable',
        [],
        (tx, results) => {
          let x = 0;
          let y = 0;
          for (let i = 0; i < results.rows.length; i++) {
            const item = results.rows.item(i);
            if (!item.project_complete)
              x++;
            else
              y++;
          }
          setProjCnt(x);
          setProjDoneCnt(y);
        },
        (tx, error) => console.log(error)
      )
    })
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.headerTitleStyle}>Fabric Stash</Card.Title>
        <Card.Divider />
        <Text style={styles.cardtext}>{'You have ' + fabricCnt + ' ' + (fabricCnt > 1 ? 'fabrics' : 'fabric') + ' in your inventory.'}</Text>
        <Button
          type='outline' title='Go to Fabric List' buttonStyle={styles.button} titleStyle={styles.buttonText}
          onPress={() => navigation.push('FabricNav')}
        />
      </Card>
      <Card>
        <Card.Title style={styles.headerTitleStyle}>Projects</Card.Title>
        <Card.Divider />
        <Text style={styles.cardtext}>{'You have ' + projCnt + ' ' + (projCnt > 1 ? 'projects' : 'project') + ' in progress and ' 
        + projDoneCnt + ' ' + (projDoneCnt > 1 ? 'projects' : 'project') + ' completed.'}</Text>
        <Button
          type='outline' title='Go to Project List' titleStyle={styles.buttonText}
          onPress={() => navigation.push('ProjectNav')}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardtext: {
    fontFamily: 'Proxima',
    paddingBottom: 20
  },
  buttonText: {
    fontFamily: 'Proxima'
  },
  headerTitleStyle: {
    fontSize: 18,
    fontFamily: 'Proxima'
  }
})
