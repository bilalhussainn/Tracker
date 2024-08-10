import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { Button, Input } from 'react-native-elements'
import Spacer from './Spacer'
import { Context } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = ({}) => {

    const [saveTrack] = useSaveTrack()

    const { state : {name, recording, locations}, 
        startRecording, 
        stopRecording, 
        changeName } = useContext(Context)

        console.log(locations.length);
        
  return (
    <>
        <Spacer>
        <Input placeholder='Enter Name' onChangeText={changeName} value={name}/></Spacer>
        
        <Spacer>
        {!recording ?
         <Button title={"Start Recording"} onPress={ startRecording}/> 
         : <Button style={{}} title={"Stop"} onPress={stopRecording}/>}
        </Spacer>

        <Spacer>
         {!recording && locations.length ? 
         <Button title="Save Recording" onPress={saveTrack}/>
            : null
         }
         </Spacer>
    </>
  )
}

const styles = StyleSheet.create({})

export default TrackForm
