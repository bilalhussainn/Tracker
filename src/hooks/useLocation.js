import {useState, useEffect} from 'react'
import { Accuracy, requestBackgroundPermissionsAsync, watchPositionAsync } from 'expo-location'

export default (shouldTrack, callback) => {
    
    const [err,setErr] = useState(null)
    //const [subscriber, setSubscriber] = useState(null)
    
      useEffect(() => { 

        let subscriber;

        const startWatching = async () => {
            try{
                console.log("Check permission" );
                let { status } =await requestBackgroundPermissionsAsync();
        
                console.log("Sttus", status);
        
                if(status === 'denied'){
                setErr(status)
                }
        
                if(status === 'granted'){
                    subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, callback)
                //setSubscriber(sub)
                }
                
            }catch(err){
                console.log("locatioon error", err);
                setErr(err)
            }
        }



        if(shouldTrack){
            startWatching();
        }else {
            if(subscriber){
                subscriber.remove();
                //setSubscriber(null)
                console.log("Location Unsubscribed");
                
            }
            subscriber = null;

        }

        return () => {
            if(subscriber){
                subscriber.remove();
                console.log("Clean up Location Unsubscribed");
            }
        }

      },[shouldTrack, callback]) 

      return [err];
}