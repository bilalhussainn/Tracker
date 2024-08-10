import trackerApi from "../api/tracker";
import createDataContext from "./createDataContext";

const trackReducer= (state, action )=> {
    
    switch(action.type){
        case 'TRACKS':
            return action.payload
        default:
            return state
    }
}


const fetchTracks = dispatch => async () => {

    //try{
        const response = await trackerApi.get('tracks')

        console.log("Fetch Response ", response.data);
        

        dispatch({type: 'TRACKS', payload: response.data.tracks}) //we are receiving email, password and tracks as response
    // }catch(e){

    // }

}

const createTrack = dispatch => async (name, locations) => {

    console.log("Create track called in track context", name, locations);

    try{

    const response = trackerApi.post('/tracks', {name, locations})

    }catch(e){

    }
    
    
    
}

export const {Context, Provider} = createDataContext(trackReducer, 
{fetchTracks, createTrack }, 
[])