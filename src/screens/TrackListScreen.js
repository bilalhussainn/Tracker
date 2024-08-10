import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { Context as TrackContext} from '../context/TrackContext'
import { ListItem } from 'react-native-elements'

const TrackListScreen = ({navigation}) => {

  const isFocused = useIsFocused()

  const {state, fetchTracks } = useContext(TrackContext)
  console.log(state);
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Tracks!!!',
      //header: () => <Text>Hellooooo</Text>
    }
    )
  })

  useEffect(() => {
    if(isFocused){
      fetchTracks();
    }
  }, [isFocused])

  return (
    <View>
      {/* <Text style={{fontSize: 48}}>TrackListScreen</Text> */}
      <Button title="Detail" onPress={() => {
        navigation.navigate("TrackDetail")
      }} />

      <FlatList
        data={state}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => {navigation.navigate("TrackDetail", {id: item._id} )}}>
              <View style={{flexDirection: 'row', padding: 10, backgroundColor: 'white'}}>
                <Text style={{fontSize : 24, padding: 10, flex: 1}}>{item.name}</Text>
                <Text style={{fontSize : 24 }}>{'>'}</Text>
              </View>
              {/* <ListItem chevron title={item.name} /> */}
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item._id}

      />
    </View>
  )
}

export default TrackListScreen

const styles = StyleSheet.create({})