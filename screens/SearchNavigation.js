
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, requireNativeComponent} from 'react-native';
import Search from './Search'
import Home from "./Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profile from "./Profile";
import PublishBook from "./PublishBook";
import Group from "./Group";

const Tab = createBottomTabNavigator();


const Route = () => {
    return(
           <Tab.Navigator screenOptions={{
                            headerShown: false,
                            tabBarStyle: { position: 'absolute',
                                           bottom: 20,
                                           left: 30,
                                           right: 30,
                                           elevation:0,
                                           backgroundColor: '#ffffff',
                                           borderRadius: 20,
                                           height: 48,
                                           elevation: 2
                                           },
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
                                        tintColor: focused ? '#bff098' : '#748c94' ,
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
                                        tintColor: focused ? '#bff098' : '#748c94' ,
                                    }}></Image>
                        </View>
                    ),
                }}
                        
                            component={Search}/>



                <Tab.Screen name='Group' options={{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <Image source={require('../image/group.png')} 
                                    resizeMode= 'contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#bff098' : '#748c94' ,
                                    }}></Image>
                        </View>
                    ),
                }}
                            component={Group}/>
            </Tab.Navigator>

            
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

})

export default Route;