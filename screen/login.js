import React from 'react';
import {View, Dimensions, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, TouchableHighlight, Image} from 'react-native';
const {width,height}=Dimensions.get('window');

const Login = ({navigation}) => {
    return(
        <View style={{flex:1,backgroundColor:'#c8e1ff37'}}>
        <ScrollView>
            <View style={{marginTop:50,paddingLeft:20}}>
            <Text style={{fontSize:30,lineHeight:42,fontWeight:'bold',color:"navy"}}>Welcome back,</Text>
            <Text style={{fontSize:20,lineHeight:42,fontWeight:'bold',color:"navy"}}>Login to continue</Text>
                
            </View>
            <View style={[styles.container]}>
                <View style={{flex:1,marginTop:50,padding:5}}>
                    <Text style={{fontSize:18,paddingBottom:5}}>Email</Text>
                    <TextInput style={{width:(width-50),height:50,borderWidth:1,borderColor:"#00000056",backgroundColor:'#c8e1ff56'}} />
                </View>
                <View style={{flex:1,marginTop:15,padding:5}}>
                    <Text style={{fontSize:16,paddingBottom:5}}>Password</Text>
                    <TextInput style={{width:(width-50),height:50,borderWidth:1,borderColor:"#00000056",backgroundColor:'#c8e1ff56'}} />
                </View>
                {/* <TouchableOpacity onPress={()=>{
                    console.log("Hello")
                }}> 
                    <Text>Hello World</Text>
                </TouchableOpacity> */}
                <View style={{flex:1,marginTop:100}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Options')} style={{
                        width:(width-50),height:60,justifyContent:'center',alignItems:'center',backgroundColor:'navy'
                    }} >
                        <Text style={{fontSize:22,color:"#fff"}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
                
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:10,
      marginTop:30

    },
  });
  

export default Login;