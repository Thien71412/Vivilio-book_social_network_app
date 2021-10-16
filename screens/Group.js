import React from "react";
import {ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,SafeAreaView,ActivityIndicator,FlatList, Button} from 'react-native';
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export default class Group extends Component{


    constructor(props) {
        super(props);
       
        this.state = {
            token: '',
            group: '',
            isLoading: true,
            isFetching: false,
        };
        this.getListGroup()
    }

    onRefresh() {
        this.setState({isFetching: true,},() => {this.getListGroup();});
    };

    componentDidMount(){
        this.getListGroup();
    };

    getListGroup = () => {
        AsyncStorage.getItem('access_token').then((access_token) => {
            axios.get('https://vivilio.herokuapp.com/api/communities/joined', { headers: {"Authorization" : `Bearer ${access_token}`} } )
                .then((res) => {this.setState({group: res.data })
                               //this.setState({isLoading: false})
                            })
                
                .catch((error) => {
                    console.log('request api error: ', error);
                }).finally(() => {this.setState({isLoading: false})
                                    this.setState({ isFetching: false })})
        });
    };

    renderItem =({item, index}) => {
        return(
            <View>
                { item.community !== null  ?
                    <TouchableOpacity style={styles.item}
                    onPress={() => {this.props.navigation.navigate('groupDetail')
                                    AsyncStorage.setItem('idCommunityHolding', JSON.stringify(item.community.id))
                                    AsyncStorage.setItem('nameCreator', item.profile.name)
                                   
                                        }}
                    >
                        <View style={styles.wrapText}>
                            <Text style={styles.fontSize}>{item.community.name}</Text>
                            <Text style={{fontSize: 14, color: '#748c94'}}>{item.community.description}</Text>
                        </View>
                        
                    </TouchableOpacity>: null
                }
            </View>
        )
    };

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.imgBackground} source={require('../image/top_nav2.png')} >
                    
                    <View style={styles.headerNav}>
                     
                        <View style={styles.header}>
                            <Text style={{fontSize: 25, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Your Group</Text>
                        </View>
            
                        <TouchableOpacity style={styles.setting}
                                            onPress={()=> this.props.navigation.navigate('CreateGroup')}>
                            <Image  source={require('../image/plus.png')}
                                            style={{height: 20, 
                                                    width: 20, 
                                                    tintColor: '#fff',}}></Image>
                        </TouchableOpacity>
                     

                    </View>
                </ImageBackground>

                <SafeAreaView style={styles.listContainer}>
                    {
                    this.state.isLoading ? <ActivityIndicator/>: (
                        <FlatList
                            data={this.state.group}
                            renderItem = {this.renderItem}
                            keyExtractor={item => `key-${item.id}`} 
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            />
                        )

                    }
                </SafeAreaView>
            </View>
        )
    }
}

const styles=StyleSheet.create({

    container:{
        flex: 1
    },

    imgBackground:{
        width:  null,
        height: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        justifyContent: 'center'
    },

    headerNav:{
        flexDirection: 'row',
    },

    header:{
        width: "90%",
        alignItems: 'center',
        paddingLeft: 40
    },

    setting:{
        //backgroundColor: 'red',
        width: "5%",
        position: 'relative',
        justifyContent: 'center'
        
    },

    listContainer:{
        marginTop: 20,
        height: "90%"
    },

    wrapText:{
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },

    fontSize:{
        fontSize: 18,
        fontWeight: 'bold'
    },

    item:{
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        marginHorizontal: 30,
        marginBottom:10
    },

    
})