import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
const { width, height } = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, setDomain, setlogUserDetail, setlogUserDetailFull, setVehicle } from './functions/helper';
import firestore from '@react-native-firebase/firestore';

const UserLogin = ({ navigation }) => {
    const [loading, setloading] = useState(false);
    const [logUser, setlogUser] = useState();
    const [email, setemail] = useState('');
    const [pword, setpword] = useState('');
    // const user = getUser();
    const domain = useRef(null);
    useEffect(() => {
        // setloading(false);
        // const user = auth().currentUser;
        // console.log('user', user);
        // if (user.uid) {
        //     console.log(user.uid);
        //     setlogUser(user.email)
        //     firestore().collection('users').doc(user.uid).get().then(document => {
        //         console.log(document.data().url);
        //         setloading(false);
        domain.current = "https://hsh.vellas.net:90/pump/api/Values";
        // domain.current = "https://demo.vellas.net:94/pump/api/Values";
        setDomain("https://hsh.vellas.net:90/pump/api/Values");
        loginStart();
        //     }).catch();
        // }
        // else {
        //     setloading(false);
        //     auth().signOut();

        // }
    }, [])
    const loginStart = async () => {
        var un = email;
        var pass = pword;
        var username = await AsyncStorage.getItem('username');
        var password = await AsyncStorage.getItem('password');
        if (username && password) {
            un = username;
            pass = password
        }
        if (un && pass) {
            setloading(true);
            const url = `${domain.current}/GetUsersLogin?_token=b95909e1-d33f-469f-90c6-5a2fb1e5627c&username=${encodeURIComponent(un)}&pw=${encodeURIComponent(pass)}`;
            console.log(url);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.length > 0) {
                        console.log(data);
                        AsyncStorage.setItem('username', un);
                        AsyncStorage.setItem('password', pass);
                        setlogUserDetail(un);
                        setlogUserDetailFull(data[0])
                        setloading(false);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'LoggedInContainer' }],
                        });
                    }
                    else {
                        Alert.alert('Wrong credentials!')
                        setloading(false)
                    }
                })
                .catch(e => {
                    console.log('error:', e)
                    Alert.alert('Wrong credentials!')
                    setloading(false)
                })
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#c8e1ff37' }}>
            <ScrollView>
                <View style={{ marginTop: 50, paddingLeft: 20 }}>
                    <Text style={{ fontSize: 30, lineHeight: 42, fontWeight: 'bold', color: "#01315C" }}>Welcome user,</Text>
                    <Text style={{ fontSize: 20, lineHeight: 42, fontWeight: 'bold', color: "#01315C" }}>Login to continue</Text>
                </View>
                <View style={[styles.container]}>
                    <View style={{ flex: 1, marginTop: 20, padding: 5, width: '100%' }}>
                        <Text style={{ fontSize: 18, paddingBottom: 5 }}>Username</Text>
                        <TextInput
                            onChangeText={text => setemail(text)}
                            style={{
                                width: '100%',
                                height: 50,
                                paddingLeft: 10,
                                backgroundColor: '#fff',
                                borderWidth: 1,
                                borderColor: '#d3d3d3',
                                marginTop: 10,
                                color: '#000',
                                borderRadius: 6
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, marginTop: 15, padding: 5, width: '100%' }}>
                        <Text style={{ fontSize: 16, paddingBottom: 5 }}>Password</Text>
                        <TextInput
                            textContentType="password"
                            secureTextEntry={true}
                            onChangeText={text => setpword(text)}
                            style={{
                                width: '100%',
                                height: 50,
                                paddingLeft: 10,
                                backgroundColor: '#fff',
                                borderWidth: 1,
                                borderColor: '#d3d3d3',
                                marginTop: 10,
                                color: '#000',
                                borderRadius: 6
                            }}
                        />
                    </View>

                    <View style={{ flex: 1, marginTop: 50, width: '100%' }}>
                        {loading ? (
                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    height: 40,
                                    marginTop: 30,
                                    backgroundColor: '#012f6c',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 6
                                }}>
                                <ActivityIndicator />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={loginStart} style={{
                                width: '100%', height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#01315C'
                            }} >
                                <Text style={{ fontSize: 22, color: "#fff" }}>Login</Text>
                            </TouchableOpacity>
                        )}
                        {/* <TouchableOpacity onPress={() => {
                            auth().signOut().then(() => navigation.replace('ClientSign'))
                        }} style={{

                        }} >
                            <Text style={{ fontSize: 18, color: "#01315C", textAlign: 'center', marginTop: 20 }}>Log Out</Text>
                        </TouchableOpacity> */}

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10

    },
});


export default UserLogin;