
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, requireNativeComponent} from 'react-native';
import Search from './Search'
import Home from "./Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profile from "./Profile";
import PublishBook from "./PublishBook";
import updateReview from "./updateReview";
import Group from "./Group";

const Tab = createBottomTabNavigator();


const Route = () => {
    return(
           <Tab.Navigator screenOptions={{
                            headerShown: false,
                            tabBarStyle:[ { position: 'absolute',
                                           bottom: 15,
                                           left: 30,
                                           right: 30,
                                           elevation:0,
                                           backgroundColor: '#ffffff',
                                           borderRadius: 20,
                                           height: 48,
                                           elevation: 2,
                                           display: 'flex',
                                           },
                                           null]
                        }}
                                                        
                            tabBarOptions={{
                                showLabel: false,
                            }}>
                <Tab.Screen name='Home' options={{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <Image source={require('../image/home.png')} 
                                    resizeMode= 'contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? 'rgb(50,215,75)' : '#748c94' ,
                                    }}></Image>
                        </View>
                    ),
                }}

                            component={Home}/>

                <Tab.Screen name='Search' options={{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <Image source={require('../image/magnifier.png')} 
                                    resizeMode= 'contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? 'rgb(50,215,75)' : '#748c94' ,
                                    }}></Image>
                        </View>
                    ),
                }}
                        
                            component={Search}/>


                <Tab.Screen name='Post' options={{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <Image source={require('../image/post-icon1.png')} 
                                    resizeMode= 'contain'
                                    style={{
                                        width: 40,
                                        height: 40,
                                        //tintColor: focused ? 'rgb(50,215,75)' : '#748c94' ,
                                    }}></Image>
                        </View>
                    ),
                }}
                        
                            component={PublishBook}/>


                <Tab.Screen name='Group' options={{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <Image source={require('../image/group.png')} 
                                    resizeMode= 'contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? 'rgb(50,215,75)' : '#748c94' ,
                                    }}></Image>
                        </View>
                    ),
                }}
                            component={Group}/>

                <Tab.Screen name='Profile' options={{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <Image source={require('../image/user.png')} 
                                    resizeMode= 'contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? 'rgb(50,215,75)' : '#748c94' ,
                                    }}></Image>
                        </View>
                    ),
                }}
                            component={Profile}/>
            </Tab.Navigator>

            
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

})

export default Route;