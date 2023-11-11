import React from 'react';
import { View, Dimensions, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
const { width, height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <View style={[styles.container]}>
                    <Image source={{ uri: "https://github.com/rudelabs/HSH/blob/master/assets/bgtext.png?raw=true" }} style={{
                        width: width, height: 100, resizeMode: 'contain', marginBottom: 50
                    }} />
                    <Text style={{ fontSize: 30, lineHeight: 42, textAlign: 'center', fontWeight: 'bold', color: "#c6a300" }}>Hock Seng Heng Transport and Trading Pte Ltd</Text>

                    {/* <TouchableOpacity onPress={()=>{
                    console.log("Hello")
                }}> 
                    <Text>Hello World</Text>
                </TouchableOpacity> */}
                    <View style={{ flex: 1, marginTop: 150 }}>
                        <TouchableOpacity onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'SignInContainer' }],
                        })} style={{
                            width: (width - 60), height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#01315C', borderRadius: 8
                        }} >
                            <Text style={{ fontSize: 22, color: "#fff" }}>Get Started</Text>
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: height / 4

    },
});


export default Welcome;