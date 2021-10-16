import React, {Component} from "react";
import {ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "react-native-image-picker"
import { file } from "@babel/types";

export default class BookUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            books: [],
            title: '',
            description:'',
            cover: [],
        };
        this.getAccessToken();
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    handleChoosePhoto = () => {
        const options ={
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            //console.log("response", response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else {
                let source = response.assets[0];
                this.setState({
                  cover: source,
                });
                }
            
        });
    };

    render (){

        const {cover} = this.state;

        const datas = new FormData();
            datas.append('title',this.state.title);
            datas.append('description',this.state.description);
            datas.append('cover', {
                name: cover.fileName,
                type: cover.type,
                uri: Platform.OS === 'android' ? cover.uri :cover.uri.replace('file://', ''),
            });

        return(
            <View style={styles.container}>
                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.top_nav}
                                     onPress={() => {this.props.navigation.goBack()}}>
                                    
                                    <Image source={require('../image/left-arrow.png')}
                                    style={{width: 20, height: 20, tintColor: '#bff098'}}/>
                                    
                    </TouchableOpacity>
    
                    <View style={styles.heading}>
                        <Text style={{fontSize: 23, fontWeight: 'bold'}}>Edit a book</Text>
                    </View>

                    
                </View>
                
                <View style={{height: '88%'}}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.inputContainer}>
                            <Text style={{fontSize: 20, color: '#748c94', paddingBottom: 10}}>Title</Text>
                            
                            <View style={styles.InputField}>
                                <TextInput style={[styles.input]}
                                    autoCorrect={false}
                                    onChangeText={(text) => {
                                    this.setState({title: text})}}/>
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

                        <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 30}}>

                            <Text style={{fontSize: 20, color: '#748c94', paddingRight: 10}}>Cover</Text>

                            <View >
                                {cover && (
                                    <View style={{paddingBottom: 10}}>
                                        <Image 
                                                source={{uri: cover.uri}}
                                                style={{width: 250, height: 250, }}/>
                                    </View>
                                    
                                )}
                                <TouchableOpacity onPress={this.handleChoosePhoto} 
                                                    style={{height: 30, width: 90, backgroundColor: '#6495ED',
                                                    alignItems: 'center', justifyContent: 'center', borderRadius: 20, alignSelf: 'center'}} >

                                    <View >
                                        <Text style={{color: 'white'}}>Select cover</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
        
        
                        <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.submit}
                                                onPress={() => //console.log(cover.uri)
                                                { AsyncStorage.getItem('idHolding').then((idHolding) => {
                                                    axios.put(`https://vivilio.herokuapp.com/api/books/${idHolding}`, datas,
                                                                { headers: {"Authorization" : `Bearer ${this.state.access_token}`}})
                                                    .then(response => {
                                                        //this.state.user= response.data
                                                        //this.setState({group: response.data})
                                                        
                                                        console.log(response.data)
                                                        alert("Updatting successfully")
                                                    }).catch((error) => {
                                                        console.log(error.response.data.message)
                                                        alert(error.response.data.message)
        
                                                        })
                                                    //this.setState({token: access_token});
                                                    //if(access_token){
                                                        //console.log(this.state.token);c
                                                    //} 
                                                    })
                                                    }
                                                }>

                                <Text style={{color: 'white', fontSize: 20}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </ScrollView>
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
        alignItems: 'center',
        paddingTop: 20
    },

    submit:{
        backgroundColor: 'green',
        height: 40,
        width: 90,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }

})