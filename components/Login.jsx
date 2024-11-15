import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'
export default function Login() {
    const router=useRouter()
  return (
    <View>
      <Image source={require('./../assets/images/login.jpg')} style={{ width:'100%', height:600}}/>
      <View style={{ backgroundColor:'#fff',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        marginTop:-20,
        padding:15,
        height:'100%'}}>
        <Text style={{fontSize:25, fontFamily:'outfit-bold'}}>AI Travel Planner</Text>
        <TouchableOpacity style={{padding:15, borderRadius:99,backgroundColor:'#000',marginTop:'15%'}} onPress={()=> router.push('auth/sign-in')}>
        <Text style={{color:"#fff", textAlign:"center",fontFamily:'outfit-bold'}}>Get Started</Text>
      </TouchableOpacity>
      </View>
     
    </View>
  )
}
