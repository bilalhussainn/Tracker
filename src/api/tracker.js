import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
    //baseURL: "http://localhost:3001"
    baseURL: "https://b0f5-2406-7400-c6-bdba-00-102.ngrok-free.app"
});

instance.interceptors.request.use(
    async (config) => { //everytime we make a request for above url
        const token = await AsyncStorage.getItem('token');
        console.log("Config",  config);
        
        if(token){
            config.headers.Authorization = "Bearer " + token;
        }
        return config
    }, 
    (err) => { //every time when we receive error when making a request. // maybe no internet connectin or something like that
        Promise.reject(err)
    }
)


export default instance;