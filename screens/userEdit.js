import React, {useState, useEffect ,Component} from "react";
import {ImageBackground, StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ScrollView, TextInput } from "react-native-gesture-handler";


export default class userEdit extends Component{

    constructor(props){
        super(props);
        this.state={
            name: '',
            social_media: '',
            bio: '',
            born: '',
            website: '',
            user: [],
            userHolding:[]
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
        <View style={styles.container}>
            <View style={styles.navContainer}>
                <TouchableOpacity style={styles.top_nav}
                                            onPress={() => this.props.navigation.goBack()
                                                            //console.log(this.userHolding)
                                                            /*AsyncStorage.getItem('userHolding').then((userHolding) => {

                                                                console.log(userHolding)
                                                            })*/
                                                            }>
                                
                                <Image source={require('../image/left-arrow.png')}
                                style={{width: 20, height: 20, tintColor: '#bff098',}}/>
                                
                </TouchableOpacity>

                <View style={styles.heading}>
                    <Text style={{fontSize: 23, fontWeight: 'bold'}}>Edit</Text>
                </View>
            </View>


            <View style={styles.contentContainer}>

                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.label}>Date of birth:</Text>
                    <Text style={styles.label}>Social Media:</Text>
                    <Text style={styles.label}>Website:</Text>
                    <Text style={styles.label}>Bio:</Text>
                </View>

                <View style={styles.inputContainer}>
                    
                    <View style={styles.input}>
                        
                        <TextInput  
                                            autoCorrect={false}
                                            multiline={false}
                                            onChangeText={(text) => {
                                            this.setState({name: text})}}>{this.state.user.name}</TextInput>
                   
                        
                        <TextInput  
                                            autoCorrect={false}
                                            multiline={false}
                                            onChangeText={(text) => {
                                            this.setState({born: text})}}>{this.state.user.born}</TextInput>
                        <TextInput  
                                            autoCorrect={false}
                                            multiline={true}
                                            onChangeText={(text) => {
                                            this.setState({social_media: text})}}>{this.state.user.social_media}</TextInput>
                        <TextInput  
                                            autoCorrect={false}
                                            multiline={true}
                                            onChangeText={(text) => {
                                            this.setState({website: text})}}>{this.state.user.website}</TextInput>
                        <TextInput 
                                            autoCorrect={false}
                                            multiline={true}
                                            onChangeText={(text) => {
                                            this.setState({bio: text})}}>{this.state.user.bio}</TextInput>
                    </View>
                    
                </View>
            </View>

            <TouchableOpacity style={{ paddingTop: 20, alignItems:'center'}}
                                onPress={() => AsyncStorage.getItem('access_token').then((access_token) => {

                                    axios.put('https://vivilio.herokuapp.com/api/users/me', 

                                                {   name: this.state.name,
                                                    social_media: this.state.social_media  ,
                                                    bio: this.state.bio  ,
                                                    born: this.state.born  ,
                                                    website: this.state.website } ,

                                                { headers: {"Authorization" : `Bearer ${access_token}`} })
                                              
                                                
                                    .then(async (response) => {
                                        alert("Update successful")
                                    })
                                    .catch((error) => {
                                        console.log(error.response.data.msg)
                                        alert("try again")})
                                        
                                    
                                    //this.setState({token: access_token});
                                    //if(access_token){
                                        //console.log(this.state.token);
                                    //} 
                                })
                                }>
                <View style={{height:50, width: 80, backgroundColor:'#bff098', borderRadius: 10, alignItems: 'center', justifyContent:'center' }}>
                    <Text style={{fontSize : 23, fontWeight: 'bold', color: 'white'}}>Done</Text>
                </View>
            </TouchableOpacity>

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
        paddingBottom: 30
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
        height: "50%",
        width: "90%",
        flexDirection: "row",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 10,
    },

    inputContainer:{
        //backgroundColor: 'red',
        padding: 10,
        width: "75%"

    },

    input:{
        justifyContent: 'center',
        //backgroundColor: "grey",
        width: "95%",
    },

    labelContainer:{
        padding: 10
    },

    label:{
        color: '#748c94',
        paddingTop: 15,
        paddingLeft: 10,
        paddingBottom: 15
        //backgroundColor: "grey",

    }

   
})