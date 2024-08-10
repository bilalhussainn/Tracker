import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Context as TrackContext } from '../context/TrackContext';
import Map from '../components/Map';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({navigation, route}) => {
  console.log(route);

  const id = route.params.id

  const {state} = useContext(TrackContext)

  const track = state.find(t => t._id === id)

  const initalCoords = track.locations[0].coords
  
  return (
    <View>
      <Text style={{fontSize: 48}}>{track.name}</Text>

      <MapView
        style={styles.map}
        initialRegion={{
        //...currentLocation.coords,
        ...initalCoords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      >
        <Polyline coordinates={track.locations.map(loc => loc.coords)}/>
      </MapView>
    </View>
  )
}

export default TrackDetailScreen

const styles = StyleSheet.create({
  map: {
    height : 300
  }
})