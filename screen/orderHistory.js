import React from 'react';
import {View, Dimensions, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
const {width,height}=Dimensions.get('window');

const OrderHistory = () => {
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={{fontSize:32,lineHeight:42,textAlign:'center',color:"brown"}}>Order History</Text>
                <View style={{flex:1,marginTop:50}}>
                    <Text style={{fontSize:18,paddingBottom:10}}>Date</Text>
                    <TextInput style={{width:(width-60),height:50,borderWidth:1,borderCOlor:"#000"}} />
                </View>
                
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:20,
      marginTop:100

    },
  });
  

export default OrderHistory;