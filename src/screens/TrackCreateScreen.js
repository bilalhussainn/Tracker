//import '../_mockLocation'
import { StyleSheet, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-elements'
import Map from '../components/Map'
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import { useIsFocused } from '@react-navigation/native'
import TrackForm from '../components/TrackForm'

const TrackCreateScreen = ({navigation}) => {

  const {state, startRecording, addLocation} = useContext(LocationContext) 
  const isFocused = useIsFocused()

  // const [err] = useLocation((location) => {
  //   addLocation(location);
  // })

  //console.log(state);

  const callback = useCallback((location) => {
    addLocation(location, state.recording)
  }, [state.recording])
  

  //same as above 
  const [err] = useLocation(isFocused || state.recording, callback) 
  

  if(isFocused) {
    //console.log("!@#$%", "ISFOCUSED");
  }else {
    //console.log("!@#$%", "ISBLURRED");
  }


  useEffect(() => {
    navigation.setOptions({
      header: () => null
    })

    const unSubscribeBlur = navigation.addListener('blur', () => {
      console.log("Leaving");
      
    })

    const unSubscribeFocus = navigation.addListener('focus', () => {
      console.log("Focused");
      
    })

    return () => {
      console.log("Listener remove");
      unSubscribeBlur();
      unSubscribeFocus();

    }
  }, [])


  return (
    <SafeAreaView>
    <View>
      <Text h2 style={{fontSize: 48}}>Create a Track</Text>
      <Map />
      {err && <Text>Please enable location services</Text>}

      <TrackForm />
    </View>
    </SafeAreaView>
  )
}

export default TrackCreateScreen

const styles = StyleSheet.create({})