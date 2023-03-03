import React from 'react';
import {View, Dimensions, Text, StyleSheet, FlatList, TextInput, ScrollView, TouchableOpacity} from 'react-native';
const {width,height}=Dimensions.get('window');

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Price List',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'New Order',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Order History',
    },
  ];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


const Options = () => {
    return(
        
            <View style={styles.container}>
              <FlatList
        data={DATA}
        numColumns={2}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
                    
            </View>
            
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal:20,
      marginTop:200,
    },
    item: {
        width:"45%",
        height:100,
        backgroundColor: '#fff', //#f9c2ff
        borderWidth:1,
        borderColor:"cornflowerblue",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 10,
        justifyContent:'center',
        alignItems:'center'
      },
      title:{
        fontSize:20,
        fontWeight:'bold'
      }
  });
  

export default Options;