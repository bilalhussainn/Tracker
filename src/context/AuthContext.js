import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {

    switch(action.type) {
        case 'ADD_ERROR':
            return {...state, errorMessage: action.payload}
        case "SIGN_UP"   :
            return { ...state, token: action.payload, errorMessage: '' }
        case "SIGN_IN":
            return {...state, token: action.payload, errorMessage: '', isLoading: false}
        case "SIGN_OUT":
            return { ...state, token: null, errorMessage: '' }
        case "CLEAR_ERROR":
            return {...state, errorMessage: ''}
        case "LOADING":
            return {...state, isLoading: action.payload}
        default:
            return state;
    }
};

const signup = (dispatch) =>  async (email, password)  => {
        //make api request with email and password
        //mpdify our state  and say that we are authenticated
        //if signup fails, we probably need oto reflect an error message somewhere in UI
        try{
            const response = await  trackerApi.post('/signup', {email, password})

            console.log(response.data);

            await AsyncStorage.setItem('token', response.data.token)

            const fromAsyncStorage = await AsyncStorage.getItem('token', (data) => {
                console.log("Asyn Get callback", data); //undefined
                
            })
            console.log("fromAsyncStorage",fromAsyncStorage);
            

            dispatch({type: 'SIGN_UP', payload: response.data.token})

            //we cant navigate to track list screen with the latest react navigation package
            //navigate('TrackList')

            //But this will work as it is in same Set
            //navigate('SignIn')
            
            //console.log(response.data);
            //callback();
            
        }catch(err) {
            console.log(err);
            dispatch({type: 'ADD_ERROR', payload: "Something went wrong with sign up"})
        }
}


const signin = (dispatch) => async (email, password)  => {
        //Try to sign in 
        //Handle success by updating state
        //Handle failure by showing error message

        try{   
            const response = await trackerApi.post('/signin', {email, password})
            await AsyncStorage.setItem('token', response.data.token)

            dispatch({type: 'SIGN_IN', payload: response.data.token})

        }catch(err){
            dispatch({type: 'ADD_ERROR', payload: "Something went wrong with sign in"})
        }

}

const signout = (dispatch) => {
    return async ()  => {
        //Somehow Sign out
        await AsyncStorage.removeItem('token')
        dispatch({type: 'SIGN_OUT'})
    }
}

const clearErrorMessage = (dispatch) => ()  => {
        dispatch({type: 'CLEAR_ERROR'})
}

const tryLocalSignin = (dispatch) => async () => {
    dispatch({type: 'LOADING', payload: true})
    
    const token = await AsyncStorage.getItem('token')
    
    if(token){
        dispatch({type: 'SIGN_IN', payload: token})
    }else {
        dispatch({type: 'LOADING', payload: false})
    }
}

export const {Provider, Context} = createDataContext(authReducer, 
    {signup, signin, signout, clearErrorMessage, tryLocalSignin},
    {token: null, errorMessage: '', isLoading: true }
)