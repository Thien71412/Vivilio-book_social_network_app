import CheckBox from "@react-native-community/checkbox";
import React from "react";
import {ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Component } from "react/cjs/react.production.min";

export default class Group extends Component{

    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            name: "",
            description: "",
            restrict_posting: false,
            visibility: "",
            category: "",
            err:"",
            group:[]
        };
    };


    render(){
        return(
            <View style={styles.container}>
            <View style={styles.navContainer}>
                <TouchableOpacity style={styles.top_nav}
                                            onPress={() => this.props.navigation.goBack()}>
                                
                                <Image source={require('../image/left-arrow.png')}
                                style={{width: 20, height: 20, tintColor: '#bff098'}}/>
                                
                </TouchableOpacity>

                <View style={styles.heading}>
                    <Text style={{fontSize: 23, fontWeight: 'bold'}}>Create a group</Text>
                </View>
            </View>
            
            <ScrollView style={styles.scrollView}>
               
               
                <View style={styles.inputContainer}>
                    <Text style={{fontSize: 20, color: '#748c94', paddingBottom: 10}}>Group Name</Text>
                    
                    <View style={styles.InputField}>
                        <TextInput style={[styles.input]}
                            autoCorrect={false}
                            onChangeText={(text) => {
                            this.setState({name: text})}}/>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={{fontSize: 20, color: '#748c94', paddingBottom: 10}}>Description</Text>
                    
                    <View style={{backgroundColor: '#fff',
                                    height: 120,
                                    width: '100%',
                                    borderRadius: 20,
                                    marginBottom: 20}}>
                        <TextInput style={[styles.input]}
                            autoCorrect={false}
                            multiline={true}
                            onChangeText={(text) => {
                            this.setState({description: text})}}/>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.CheckBoxContainer}>

                        <Text style={{fontSize: 20, color: '#748c94', paddingBottom: 10}}>Restrict posting</Text>

                        <CheckBox
                            value={this.state.checked}
                            onValueChange={() => this.setState({ checked: !this.state.checked })}
                                //disabled={false}
                                //defaultChecked={this.state.isChecked}
                                //onValueChange={this.toggleChange}
                            style={styles.checkbox}/>
                    </View>
                </View>
                

                <View style={styles.inputContainer}>
                    <Text style={{fontSize: 20, color: '#748c94', paddingBottom: 10}}>Visibility</Text>
                    
                    <View style={{backgroundColor: '#fff',
                                    width: '100%',
                                    borderRadius: 20,
                                    marginBottom: 20}}>
                        <TextInput style={[styles.input]}
                            autoCorrect={false}
                            multiline={true}
                            onChangeText={(text) => {
                            this.setState({visibility: text})}}/>
                    </View>
                </View>

                <View style={styles.inputContainer}>

                    <View >
                        <Text style={{fontSize: 20, color: '#748c94', paddingBottom: 10, paddingRight: 30}}>Categories</Text>

                    </View>
                    
                    <View style={styles.InputField}>
                        <TextInput style={[styles.input]}
                            autoCorrect={false}
                            multiline={true}
                            onChangeText={(text) => {
                            this.setState({category: text})}}/>
                    </View>
                </View>

                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.submit}
                                         onPress={() => AsyncStorage.getItem('access_token').then((access_token) => {

                                            axios.post('https://vivilio.herokuapp.com/api/communities', 
                                                        {   name: this.state.name,
                                                            description: this.state.description  ,
                                                            restrict_posting: this.state.checked  ,
                                                            visibility: this.state.visibility  ,
                                                            category: this.state.category } ,
        
                                                        { headers: {"Authorization" : `Bearer ${access_token}`} })
                                            .then(response => {
                                                //this.state.user= response.data
                                                this.setState({group: response.data})
                                                console.log(this.state.group)
                                                alert("successfully creation")
                                            }).catch((error) => {
                                                console.log(error.response.data.message)
                                                alert(error.response.data.message)

                                                })
                                            //this.setState({token: access_token});
                                            //if(access_token){
                                                //console.log(this.state.token);
                                            //} 
                                        })
                                        }>
                        <Text style={{color: 'white', fontSize: 20}}>Create</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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

    heading:{
        //backgroundColor: 'red',
        justifyContent: 'center',
        width: '70%',
        alignItems: 'center'
    },

    top_nav:{
        
        padding: 20,
      
    },

    bookContainer:{
        alignItems: 'center'
    },

    bookImg:{
        height: 250,
        width: 250,
        backgroundColor: '#748c94',
        
    },

    scrollView: {
        
    },

    bookName:{
        padding: 30
    },

    InputField:{
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
        borderRadius: 20,
        marginBottom: 20
    },

    input:{
        fontSize: 18,
        marginHorizontal: 20
    },

    inputContainer:{
        marginHorizontal: 30,
    },

    submitContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },

    submit:{
        backgroundColor: 'green',
        height: 40,
        width: 90,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    checkbox:{
        alignSelf: 'baseline',
    },
    CheckBoxContainer:{
        flexDirection: 'row',

    }

})