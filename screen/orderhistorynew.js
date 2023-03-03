import React, { useState } from "react";
import { ScrollView, StyleSheet,Text, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
const OrderHistoryNew = () => {
    const [tableHead,setTableHead]=useState(['Head', 'Head2', 'Head3', 'Head4']);
    const [tableData,settableData]=useState([
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ])
    return(
        <View style={{paddingHorizontal:10,marginTop:40}}>
          <View style={{borderBottomWidth:1,borderBottomColor:"#d3d3d3"}}>
              <Text style={{fontSize:32,fontWeight:'400',marginBottom:20}}>Order History</Text>
          </View>
            
             <ScrollView>
                <View style={{flex:1,marginTop:20,backgroundColor:'#c8e1ff56',padding:15}}>
                    <Text style={{fontSize:22,color:'red',fontWeight:'600'}}>Incomplete</Text>
                    <Text style={{fontSize:28,marginTop:10}}>Sub-Content 1</Text>
                </View>

                <View style={{flex:1,marginTop:20,backgroundColor:'#c8e1ff56',padding:15}}>
                    <Text style={{fontSize:22,color:'cornflowerblue',fontWeight:'600'}}>Completed</Text>
                    <Text style={{fontSize:28,marginTop:10}}>Sub-Content 1</Text>
                </View>

                <View style={{flex:1,marginTop:20,backgroundColor:'#c8e1ff56',padding:15}}>
                    <Text style={{fontSize:22,color:'cornflowerblue',fontWeight:'600'}}>Completed</Text>
                    <Text style={{fontSize:28,marginTop:10}}>Sub-Content 1</Text>
                </View>
             </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });

export default OrderHistoryNew;