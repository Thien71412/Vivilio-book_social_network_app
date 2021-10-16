import React, { Component } from "react";
import {ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, requireNativeComponent,Provider, Divider} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default class updateReview extends Component{

    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            overview: '',
            content:'' ,
            star: null,
            started: '',
            finished: '',
            idBooks: '',
            idReview: '',
        }; 
        this.getIDReview();
        this.getIdBook();
        this.getAccessToken();
    }

    getIDReview=() =>{
        AsyncStorage.getItem('idReview').then((idReview)=>{
            this.setState({idReview: idReview})
        });
    }

    getIdBook= () =>{
        AsyncStorage.getItem('idHolding').then((idHolding) => {
            this.setState({idBooks: idHolding})
        })
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    updateReview=() =>{
        axios.put( `https://vivilio.herokuapp.com/api/books/${this.state.idBooks}/reviews/${this.state.idReview}` ,
            {
                overview: this.state.overview,
                content: this.state.content,
                star: this.state.star,
                started: this.state.started,
                finished: this.state.finished,
            }
        ,{ headers: {"Authorization" : `Bearer ${this.state.access_token}`} } )
            .then((res) => 
            { alert("Successfully")
                console.log(res.data)
        })
        .catch((error) => {
            console.log('request api error: ', error);
        })
    }

  render(){
    return(
      <View style={{ flex: 1, height: 30, width: "100%", backgroundColor: 'white', alignSelf: 'center',
                                        backgroundColor: 'white', justifyContent: 'center' }}>
                                <View style={{padding: 15}}>
                                    <Text style={{fontSize: 20}}>Overview</Text>
                                    <View style={{backgroundColor: '#f2f2f2', height: 40,
                                                width: '100%', paddingLeft: 10,borderRadius: 20,}}>
                                    <TextInput 
                                        autoCorrect={false}
                                        multiline={true}
                                        onChangeText={(text) => {
                                        this.setState({overview: text})}}/>
                                    </View>
                                </View>

                                <View style={{padding: 15, paddingTop: 0}}>
                                    <Text style={{fontSize: 20}}>Content</Text>
                                    <View style={{backgroundColor: '#f2f2f2', 
                                                width: '100%',borderRadius: 20, paddingLeft: 10}}>
                                        <TextInput 
                                            autoCorrect={false}
                                            multiline={true}
                                            numberOfLines={4}
                                            onChangeText={(text) => {
                                            this.setState({content: text})}}/>
                                    </View>
                                </View>

                                <View style={{padding: 15, paddingTop: 0}}>
                                    <View style={{flexDirection: 'row'}}> 
                                        <Text style={{fontSize: 20}}>Star</Text>
                                        <Text style={{fontSize: 15, color: '#748c94', paddingTop: 5, paddingLeft: 5}}>{'('} from 1 to 5{')'}</Text>
                                    </View>
                                    <View style={{backgroundColor: '#f2f2f2',height: 40,
                                                width: '100%',borderRadius: 20, paddingLeft: 10}}>
                                        <TextInput 
                                            autoCorrect={false}
                                            multiline={true}
                                            onChangeText={(value) => {
                                            this.setState({star: value})}}/>
                                    </View>
                                </View>

                            <View style={{padding: 15, paddingTop: 0}}>
                                <View style={{flexDirection: 'row'}}> 
                                    <Text style={{fontSize: 20}}>Started reading</Text>
                                    <Text style={{fontSize: 15, color: '#748c94', paddingTop: 5, paddingLeft: 5}}>{'('}YYYY-MM-DD{')'}</Text>
                                </View>
                                <View style={{backgroundColor: '#f2f2f2',height: 40,
                                            width: '100%',borderRadius: 20, paddingLeft: 10}}>
                                    <TextInput 
                                        autoCorrect={false}
                                        multiline={true}
                                        onChangeText={(text) => {
                                        this.setState({started: text})}}/>
                                </View>
                            </View>

                            <View style={{padding: 15, paddingTop: 0}}>
                                <View style={{flexDirection: 'row'}}> 
                                    <Text style={{fontSize: 20}}>Finished reading</Text>
                                    <Text style={{fontSize: 15, color: '#748c94', paddingTop: 5, paddingLeft: 5}}>{'('}YYYY-MM-DD{')'}</Text>
                                </View>
                                <View style={{backgroundColor: '#f2f2f2',height: 40,
                                            width: '100%',borderRadius: 20, paddingLeft: 10}}>
                                    <TextInput 
                                        autoCorrect={false}
                                        multiline={true}
                                        onChangeText={(text) => {
                                        this.setState({finished: text})}}/>
                                </View>
                            </View>
                                                            
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity style={{backgroundColor: 'rgb(50,215,75)', height: 30, width: 80, marginRight: 15,
                                                            justifyContent: 'center', alignItems: 'center', borderRadius: 10}}
                                                            onPress={() => { this.updateReview()}}>
                                    <Text style={{color: 'white',}}>Post</Text>
                                </TouchableOpacity>

                                <TouchableOpacity  style={{ backgroundColor: '#f2f2f2',height: 30, width: 80,borderRadius: 10, 
                                                            justifyContent: 'center', alignItems: 'center'}}
                                                    onPress={() => this.props.navigation.goBack()}>
                                        <Text>Cancel</Text>
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

})


