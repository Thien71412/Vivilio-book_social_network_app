import React, {useState, useEffect ,Component} from "react";
import {ImageBackground, StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Profile from "./Profile";


export default class User extends Component {


    constructor(props) {
        super(props);
        this.state = {
            token: '',
            user: []
        };
    }

    componentDidMount(){
        AsyncStorage.getItem('access_token').then((access_token) => {

            axios.get('https://vivilio.herokuapp.com/api/users/me', 
            { headers: {"Authorization" : `Bearer ${access_token}`},
                 })
            .then(response => {
                //this.state.user= response.data
                this.setState({user: response.data})
                //console.log(this.state.name)
            }).catch((error) => {
                console.log(error.response.data.msg)})
            
            //this.setState({token: access_token});
            //if(access_token){
                //console.log(this.state.token);
            //} 
        });
    }

  

    render(){

        return(
            <View styles={styles.container}>
                
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.cancel}
                                        onPress={() => {this.props.navigation.goBack()
                                                        }
                                            
                                                            }>
                        <Text style={{fontSize: 17, fontWeight: "bold", color: "#bff098"}}>Cancel</Text>
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={{fontSize: 23, fontWeight: 'bold'}}>Your Profile</Text>
                    </View>
                    
                    <View style={styles.confirm}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("userEdit")}>
                            <Text style={{fontSize: 17, fontWeight: "bold", color: "#bff098"}}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            
                <View style={styles.avatar}>
                    <TouchableOpacity >
                        <View styles={styles.editAvatar}>
                            <Image  style={{height:100, width: 100,}} source={require('../image/profile.png')}></Image>
                            <Text style={{fontSize: 16, paddingTop: 10}}>Update picture</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.profileContainer}>
                    <View style={styles.profile} >
                        <View style={styles.profileContent} >

                            <View style={styles.profileContentAlign}>
                                <Text style={{fontSize: 15, color: '#748c94',paddingBottom: 10}}>ID:</Text>
                                <Text style={{fontSize: 15, color: '#748c94',paddingBottom: 10}}>Name:</Text>
                                <Text style={{fontSize: 15, color: '#748c94',paddingBottom: 10}}>Date of birth:</Text>
                                <Text style={{fontSize: 15, color: '#748c94',paddingBottom: 10}}>Email:</Text>
                                <Text style={{fontSize: 15, color: '#748c94',paddingBottom: 10}}>Member since:</Text>
                                
                                <Text style={{fontSize: 15, color: '#748c94',paddingBottom: 20}}>Social Media:</Text>
                                <Text style={{fontSize: 15, color: '#748c94',paddingBottom: 15}}>Website:</Text>
                                <Text style={{fontSize: 15, color: '#748c94',paddingBottom: 10}}>Bio:</Text>
                            </View>

                            <View style={styles.profileContentAlign}>
                            
                                <Text style={{paddingLeft: 20,fontSize: 15,paddingBottom: 10}}>{this.state.user.id}</Text>
                                <Text style={{paddingLeft: 20,fontSize: 15,paddingBottom: 10}}>{this.state.user.name}</Text>
                                <Text style={{paddingLeft: 20,fontSize: 15,paddingBottom: 10}}>{this.state.user.born}</Text>
                                <Text style={{paddingLeft: 20,fontSize: 15,paddingBottom: 10}}>{this.state.user.email}</Text>
                                <Text style={{paddingLeft: 20,fontSize: 15,paddingBottom: 10}}>{this.state.user.member_since}</Text>
                                <Text style={{paddingLeft: 20,fontSize: 15,paddingBottom: 10, width: "90%"}}>{this.state.user.social_media}</Text>
                                <Text style={{paddingLeft: 20,fontSize: 15,paddingBottom: 10, width: "90%"}}>{this.state.user.website}</Text>
                                <Text style={{paddingLeft: 20,fontSize: 15,paddingBottom: 10, 
                                                width: "90%", height: "20%" }}>{this.state.user.bio}</Text>

                            </View>
                            
                        </View>

                    </View>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    topNav:{
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 3
    },

    cancel:{
        position: 'absolute',
        left: 0,
        paddingLeft: 15,
    },

    header:{
        alignItems:'center'
    },

    avatar:{
        //backgroundColor: 'grey',
        alignItems: 'center',
        padding: 20,
    },

    editAvatar:{
        marginLeft: 20,
        paddingBottom: 10
    },

    confirm:{
        position: 'absolute',
        right: 0,
        paddingRight: 15
    },

    profileContainer:{
        alignItems: 'center'
    },

    profile:{
        backgroundColor: 'white',
        height: "70%",
        width: "93%",
        borderRadius: 10
    },
    
    profileContent:{
        padding: 15,
        flexDirection: 'row',

    }


})