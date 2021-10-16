import React, {Component} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';

export default class Setting extends Component{

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.top_nav}
                                                onPress={() => this.props.navigation.goBack()}>
                                    
                                    <Image source={require('../image/left-arrow.png')}
                                    style={{width: 20, height: 20, tintColor: '#bff098',}}/>
                                    
                    </TouchableOpacity>
    
                    <View style={styles.heading}>
                        <Text style={{fontSize: 23, fontWeight: 'bold'}}>Setting</Text>
                    </View>
                </View>
    
                <View style={styles.contentContainer}>
    
                    <TouchableOpacity style={styles.content}
                                    onPress={() => this.props.navigation.navigate("User")}>
                        <Text style={{fontSize: 17, paddingLeft: 20}}>Your Profile</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.content}
                                    onPress=
                                    
                                    {() => {
                                        AsyncStorage.removeItem('access_token').then((access_token) => {
                                            if(access_token===null){
                                                console.log(access_token)
                                                this.props.navigation.replace('Login')
                                            }else   alert("try again")
                                           
                                                                             })
                                    
                                }}>
                        <Text style={{fontSize: 17, paddingLeft: 20}}>Sign out</Text>
                    </TouchableOpacity>
    
                </View>
    
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
    },

    navContainer:{
        flexDirection: 'row',
        
    },

    top_nav:{
        
        padding: 20,
      
    },

    heading:{
        //backgroundColor: 'red',
        justifyContent: 'center',
        width: '70%',
        alignItems: 'center'
    },

    contentContainer:{
        alignItems: 'center',
        marginHorizontal: 20,
    },

    content:{
        height: 40,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 10
    }
})
