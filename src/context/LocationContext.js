import createDataContext from "./createDataContext";


const LocationReducer = (state, action) => {

    switch(action.type){
        case 'ADD_CURRENT_LOCATION':
            return {...state, currentLocation: action.payload};
        case 'START_RECORDING':
            return {...state, recording: true}
        case 'STOP_RECORDING':
            return {...state, recording: false}
        case 'ADD_LOCATION':
            return {...state, locations: [...state.locations, action.payload]}    
        case 'CHANGE_NAME':
            return {...state, name: action.payload}
        case 'RESET':
            return {...state, name: '', locations: []}
        default:
            return state;
    }
}

const startRecording = dispatch => () => {
    dispatch({type: 'START_RECORDING'})
}

const stopRecording = dispatch => () => {
    dispatch({type: 'STOP_RECORDING'})
}

const addLocation = dispatch => (location, recording) => {
    //console.log("Adding Current Location");
    
    dispatch({type: "ADD_CURRENT_LOCATION", payload: location})

    if(recording){
        console.log("Adding Track Location");
        dispatch({type: "ADD_LOCATION", payload: location})
    }
}

const reset = dispatch => () => {
    dispatch({type: "RESET"})
}

const changeName = dispath => (name) => {
    dispath({type: "CHANGE_NAME", payload: name})
}

export const {Context, Provider} = createDataContext(LocationReducer,
    { startRecording, stopRecording, addLocation, changeName, reset },
    {currentLocation: null, locations: [], recording: false, name: ''}
)