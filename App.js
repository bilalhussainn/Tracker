import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import AccountScreen from './src/screens/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from './src/context/Appcontext';
import { Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuth from './src/screens/ResolveAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as LocationProvider} from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { Feather, FontAwesome } from '@expo/vector-icons'



const Tab = createBottomTabNavigator();

const SplashStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const TrackStack = createNativeStackNavigator();
const TrackCreateStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();


function App() {

  const [isSignedIn, setSignedIn] = useState(false);

  const {state, tryLocalSignin} = useContext(AuthContext)
  const {token} = state

  console.log("Token on App", token);

  // useEffect(() => {
  //   tryLocalSignin();
  // }, [])
  
  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <ResolveAuth />;
  }
  

  return (
    <NavigationContainer ref={(navigator) => { setNavigator(navigator)}}>
      {!token ?
        
        <AuthStack.Navigator initialRouteName='SignUp'>
          <AuthStack.Screen name='SignUp' component={SignupScreen} />
          <AuthStack.Screen name='SignIn' component={SigninScreen} />
        </AuthStack.Navigator>
       :
        <Tab.Navigator initialRouteName='Create'  screenOptions={{headerShown: false}}>
          <Tab.Screen name="Tracks" options={{
            //tabBarLabel: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome name="th-list" size={24} color={focused ? "green" : "grey"} />
            ),
          }}>
            { () => <TrackStack.Navigator  screenOptions={{}}>
              <TrackStack.Screen name='TrackList' component={TrackListScreen} />
              <TrackStack.Screen name='TrackDetail' component={TrackDetailScreen} />
            </TrackStack.Navigator>
            }
          </Tab.Screen>
          <Tab.Screen name="Add Track" options={{
            //tabBarLabel: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome name="plus" size={24} color={focused ? "green" : "grey"} />
            ),
          }}>
            {() => <TrackCreateStack.Navigator initialRouteName='TrackCreate'>
                <TrackCreateStack.Screen name='TrackCreate' component={TrackCreateScreen} /> 
            </TrackCreateStack.Navigator>}
          </Tab.Screen>
          <Tab.Screen name="Account" options={{
            //tabBarLabel: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome name="gear" size={24} color={focused ? "green" : "grey"} />
            ),
          }}>
            {() =><AccountStack.Navigator initialRouteName='Account'  >
                  <AccountStack.Screen name='Account' component={AccountScreen} />
              </AccountStack.Navigator>}
          </Tab.Screen>
        </Tab.Navigator>
      }
      
    </NavigationContainer>
  );
}

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  )
}