import { assertBinary } from "@babel/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {Component} from "react";
import {Button, StyleSheet, Text, View, Image, ActivityIndicator, ImageBackground,
        TouchableOpacity, FlatList, SafeAreaView, RefreshControl, TextInput,Provider, Divider, ViewPropTypes} from 'react-native';
import axios from "axios";
import CheckBox from "@react-native-community/checkbox";
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default class UpdateMember extends Component{
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            user: [],
            checked: false,
            role:'',
            idCommunityHolding: '',
        };
        this.getAccessToken();
        this.getUser();
        this.getIdCommunity();
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    getIdCommunity=()=>{
        AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {
            this.setState({idCommunityHolding: idCommunityHolding})
        })
    }

    getUser=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {

            axios.get('https://vivilio.herokuapp.com/api/users/me', { headers: {"Authorization" : `Bearer ${access_token}`} })
            .then(response => {
                //this.state.user= response.data
                this.setState({user: response.data})
                //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                //console.log(JSON.stringify(response.data.id))
                //console.log(this.state.user)
            }).catch((error) => {
                console.log(error.response.data.msg)})
        });
    }

    UpdateMember=()=>{
        AsyncStorage.getItem('idMember').then((idMember) => {

            axios.put(`https://vivilio.herokuapp.com/api/communities/${this.state.idCommunityHolding}/members/${idMember}/roles`, 
               { 
                role: this.state.role,
               }
            ,{ headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
            .then(response => {
                //this.state.user= response.data
                //this.setState({post: response.data})
                //console.log(this.state.post)
                //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                //console.log(JSON.stringify(response.data.id))
                //console.log(this.state.user)
                //this.getListPost()
                if(response.data.message){
                    alert(res.data.message)
                }
                alert("Updating successfully")
                console.log("Updating successfully")
            }).catch((error) => {
                console.log(error)})
                
        });
    }

    render(){
        return(
            <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.top_nav}
                                                    onPress={() => this.props.navigation.goBack()}>
                                        
                                        <Image source={require('../image/left-arrow.png')}
                                        style={{width: 20, height: 20, tintColor: 'rgb(50,215,75)'}}/>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.createPost}>
                        <View style={styles.user}>
                            <Text>Role</Text>
                        </View>
                        <AutoGrowingTextInput  style={{backgroundColor: '#f2f2f2', marginHorizontal: 20, borderRadius: 20, paddingTop: 10, paddingLeft: 10}}
                                    placeholder='Edit content...'
                                    autoCorrect={false}
                                    onChangeText={(text) => {
                                    this.setState({role: text})}}
                                    > 

                        </AutoGrowingTextInput>

                        <View>
                            <View style={styles.checkBox}>
                                    
                                <TouchableOpacity style={{ }}
                                                    onPress={()=> {this.UpdateMember()}}>
                                    <View   View  style={{width:170,height: 30 ,backgroundColor: 'rgb(50,215,75)', alignItems: 'center', 
                                            justifyContent: 'center', borderRadius: 20}}>
                                        <Text style={{color: 'white'}}>Update Member</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
    },
    top_nav:{
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 10
    },
    createPost:{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15, 
        marginBottom: 10
    },
    user:{
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    checkBox:{
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
})