import { assertBinary } from "@babel/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { Component } from "react";
import {ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            Err: ''
        };
    }
    
    render(){
        return(
            <ImageBackground source={require('../image/background.png')} 
                style={styles.imgBackground}>
                <View style={styles.Container}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../image/logo.png')} 
                            style={styles.logo}>
                        </Image>
                    </View>
                    <View style={styles.infoContainer}>
                        <TextInput 
                            style={[styles.input,styles.boxShadow]}
                            placeholder="Email or username"
                            placeholderTextColor='rgba(93,93,93,0.5)'
                            keyboardType='email-address'
                            returnKeyType='next'
                            autoCorrect={false}
                            
                            onChangeText={(text) => {
                                this.setState({email: text})
                            }}
                            >
                        </TextInput>
                        <TextInput 
                            style={[styles.input,styles.boxShadow]}
                            placeholder="Password"
                            placeholderTextColor='rgba(93,93,93,0.5)'
                            returnKeyType='go'
                            autoCorrect={false}
                            secureTextEntry
                            
                            onChangeText={(text) => {
                                this.setState({password: text})
                            }}
                            >
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.boxShadow]}
                                onPress={()=>  //this.props.navigation.replace('Route')
                                   {
                                            axios.post('https://vivilio.herokuapp.com/api/auth', 
                                        {
                                            email: this.state.email,
                                            password: this.state.password
                                        }).then(async (response) => {
                                            //console.log(response.data);
                                            await AsyncStorage.setItem('access_token', response.data.access_token)
                                            this.props.navigation.replace('Route');

                                        }).catch( function (error) {
                                            alert(error.response.data.message);
                                        })

                                    }
                                    
                                }>
                                <Text  style={styles.buttonText}>Log In</Text>

                                
                            </TouchableOpacity>

                            <TouchableOpacity style={{paddingTop: 7}}>
                                <Text style={{color: 'white',}}>Register Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}


//export default Login;

const styles = StyleSheet.create({

    imgBackground: {
        width: null,
        height: null,
        flex: 1
    },

    Container: {
        flex: 1,
        flexDirection: 'column'
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 200,
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    },

    logo: {
        width: 170,
        height: 100
    },

    infoContainer: {
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        paddingHorizontal: 80,
        marginBottom: 120,
    },

    input:{
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
    },

    boxShadow: {
        elevation: 5
    },

    buttonContainer:{
        alignItems: 'center'
    },

    button: {
        height: 30,
        width: 60,
        backgroundColor: 'rgba(191,240,15,1)',
        borderRadius: 15,
        marginTop: 15
    },

    buttonText: {
        textAlign: 'center',
        paddingTop: 5,
        color: '#fff',
        fontWeight: 'bold'
    }
})