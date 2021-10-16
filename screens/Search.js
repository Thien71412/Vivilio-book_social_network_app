import React from "react";
import {ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserSearch from "./UserSearch";
import BookSearch from "./BookSearch";
import GroupSearch from "./GroupSearch";
import { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Tab = createBottomTabNavigator();

export default class Search extends Component {

    render(){

        return(
            <View style={styles.container}>
                
    
                <Tab.Navigator screenOptions={{
                                headerShown: false,
                                tabBarStyle: { position: 'absolute',
                                               top: 70,
                                               left: 60,
                                               right: 60,
                                               elevation:0,
                                               backgroundColor: '#ffffff',
                                               borderRadius: 20,
                                               height: 42,
                                               },
                            }}
                                                            
                                tabBarOptions={{
                                    showLabel: false,
                                }}>
                    <Tab.Screen name='Book' options={{
                        tabBarIcon: ({focused}) => (
                            <View  style={[styles.iconAlign ,{backgroundColor: focused ? 'rgb(50,215,75)' : 'white'}]} >
                                <Image source={require('../image/user.png')} 
                                        resizeMode= 'contain'
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? 'white' : '#748c94' ,
                                            
                                        }}></Image>
                            </View>
                        ),
                    }}
    
                                component={UserSearch}
                                />
    
                    <Tab.Screen name='User' options={{
                        tabBarIcon: ({focused}) => (
                            <View style={[styles.iconAlign ,{backgroundColor: focused ? 'rgb(50,215,75)' : 'white'}]} >
                                <Image source={require('../image/open-book.png')} 
                                        resizeMode= 'contain'
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? 'white' : '#748c94' ,
                                        }}></Image>
                            </View>
                        ),
                    }}
                            
                                component={BookSearch}/>
    
                    <Tab.Screen name='Group' options={{
                        tabBarIcon: ({focused}) => (
                            <View style={[styles.iconAlign ,{backgroundColor: focused ? 'rgb(50,215,75)' : 'white'}]} >
                                <Image source={require('../image/group.png')} 
                                        resizeMode= 'contain'
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? 'white' : '#748c94' ,
                                        }}></Image>
                            </View>
                        ),
                    }}
                            
                                component={GroupSearch}/>
    
    
                </Tab.Navigator>
            </View>
        )
    }
    }
    


const styles=StyleSheet.create({
   
    searchBar:{
        flexDirection: 'row',
        marginTop: 15,
        justifyContent:'center'
    },

    textInput:{
        //backgroundColor: "green",
        width: '85%',
        height: '100%',
        marginLeft: 10,
        
    },
    
    fieldSearch:{
       
        justifyContent :'center',
        alignItems: 'flex-end',
        flex: 1,
        marginRight:  10
    },
   
    isSearch:{
        height: 15,
        width: 15,
        margin: 5,
        tintColor: '#748c94',
    },
   
    searchContainer:{
        backgroundColor: '#fff',
        width: '70%',
        height: '75%',
        borderRadius: 20,
        flexDirection: 'row',
        marginLeft: 10
    },
    
    container:{
        flex: 1,
    },

    imgBackground:{
        width:  null,
        height: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        
    },

    logoContainer:{
        alignItems: 'center',
        
    },

    logo:{
        width: 70,
        height: 30,
        marginBottom:10
    },


    iconAlign:{
        height:32,
        width: 82,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:20
    }
    

    
})
