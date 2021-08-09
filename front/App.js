import React, { useEffect, useState, useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font';
import { View,Text } from 'react-native';


import RootStack from './navigators/RootStack'
// import Splash from './screens/Splash'

export default class App extends React.Component{

  // state={
  //   isLoading:true,
  // }
  // componentDidMount=async()=>{
  //   setTimeout(()=>{this.setState({isLoading:false,})},3000)
  // }

  render(){
    // if(this.state.isLoading){
    //   return <Splash/>
    // }else{
      return <RootStack/>
    // }
  }
}