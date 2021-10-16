import React, {Component} from "react";
import {ImageBackground, StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, FlatList, SafeAreaView, RefreshControl, TextInput} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default class GroupSearch extends Component{

    constructor(props) {
        super(props);
       
        this.state = {
            token: '',
            communities: [],
            isLoading: false,
            isFetching: false,
            idHolding: '',
            query: '',
        };
    }

    getUserList= () => {
        AsyncStorage.getItem('access_token').then((access_token) => {
            axios.get(`https://vivilio.herokuapp.com/api/search/communities?query=${this.state.query}`,
                { headers: {"Authorization" : `Bearer ${access_token}`} } )
                .then((res) => {this.setState({communities: res.data } )
                               //this.setState({isLoading: false})
                               //console.log(res.data)
                               //console.log(res.data.message)
                               if(Object.keys(this.state.communities).length === 0){
                                    alert("not found")
                               }
                            })
                
                .catch((error) => {
                    console.log('request api error: ', error);
                    //console.log(this.state.query)
                }).finally(() => {this.setState({isLoading: false})
                                    this.setState({ isFetching: false })})
        });
    }

    renderItem =({item, index}) => {
        return(
                <TouchableOpacity style={styles.item}
                                    onPress={() => {this.props.navigation.navigate('GroupLobby')
                                                    AsyncStorage.setItem('idCommunityHolding', JSON.stringify(item.id))
                                                }}
                                                        >
                    <View style={styles.wrapText}>
                        
                        <Text style={styles.fontSize}>{item.name}</Text>
                        <Text style={{fontSize: 14, color: '#748c94'}}>{item.description}</Text>
                    </View>
                    
                </TouchableOpacity>
            
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.imgBackground} source={require('../image/top_nav2.png')} >
                    
                    <View style={styles.searchBar} >
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={require('../image/logo.png')}></Image>
                        </View>  

                        <View style={styles.searchContainer}>
                            <TextInput style={styles.textInput}
                                        placeholder="Find somethings..."
                                        placeholderTextColor='rgba(93,93,93,0.5)'
                                        returnKeyType='next'
                                        autoCorrect={false}

                                        onChangeText={(text) => {
                                        this.setState({query: text})}}
                                        >
                            </TextInput>
                                
                            <TouchableOpacity style={styles.fieldSearch}
                                                onPress={() => {
                                                                        
                                                    this.getUserList()
                                                }}>
                                <Image 
                                        style={styles.isSearch}
                                        source={require('../image/magnifier.png')}/>
                            </TouchableOpacity>
                                
                        </View>
                    </View>
                    
                </ImageBackground>
                
                <View style={{paddingTop: 60, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#748c94', }}>Groups were found: {Object.keys(this.state.communities).length}
                    </Text>
                </View>

                <SafeAreaView style={styles.listContainer}>

                    {
                    this.state.isLoading ? <ActivityIndicator/>: (
                        <FlatList
                        
                            data={this.state.communities}
                            renderItem = {this.renderItem}
                            keyExtractor={item => `key-${item.id}`} 
                            //onRefresh={() => this.onRefresh()}
                            //refreshing={this.state.isFetching}
                                                    
                            />
                        )

                    }
                </SafeAreaView>

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


    item:{
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        marginHorizontal: 30,
        marginBottom:10
    },

    wrapText:{
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },

    fontSize:{
        fontSize: 18
    },

    listContainer:{
        height: "68%",
        paddingTop: 15
    }

})