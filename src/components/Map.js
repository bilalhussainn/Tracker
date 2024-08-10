import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { Text } from 'react-native-elements'
import MapView, {Polyline, Circle} from 'react-native-maps'
import { Context as LocationContext } from '../context/LocationContext'
 
const Map = () => {

    const { state : {currentLocation, locations},  } = useContext(LocationContext) //new Destructuring way

    //console.log("NEW DATA FROM MAP", locations);

    if(!currentLocation){
        return <ActivityIndicator  size={"large"} style={{marginTop: 200}}/>
    }
    
    
  return <MapView 
    style={styles.map}
    initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }}
    // region={{
    //     ...currentLocation.coords,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // }}
    >

        <Circle center={currentLocation.coords} radius={30} strokeColor='rgba(158,158,255,1.0)' fillColor='rgba(158,158,255, 0.3)' />

        <Polyline coordinates={locations.map((loc) => {
            return loc.coords
        })} />
    </MapView>
}

export default Map

const styles = StyleSheet.create({
    map: {
        height: 300,
    }
})  




// let points = []

//     for(let i=0;i< 20;i++){

//         if(i%2 ===0 ){
//             points.push({
//                 latitude: 37.33233 + i* 0.001,
//                 longitude: -122.03121 + i * 0.001,
            
//             })
//         }else {
//             points.push({
//                 latitude: 37.33233 - i* 0.002,
//                 longitude: -122.03121 - i * 0.001,
            
//             })
//         }
        
//     }