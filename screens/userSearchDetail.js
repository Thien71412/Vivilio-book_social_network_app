import React, {useState, useEffect ,Component} from "react";
import {ImageBackground, StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, FlatList, SafeAreaView, RefreshControl, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BooksDetail from "./BooksDetail";
import Modal from "react-native-modal";


export default class userSearchDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            user: [],
            books: [],
            isLoading: true,
            isFetching: false,
            isModalVisible: false,
            idHolding: '',
            idUser:'',
        };
        this.getAccessToken();
        this.getListUserBook();
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    onRefresh() {
        this.setState({isFetching: true,},() => {this.getListUserBook();
                                                    this.getUserUpdate();});
    }

    componentDidMount(){
        this.getListUserBook();
    }

    getListUserBook = () => {
        AsyncStorage.getItem('idUserHolding').then((idUserHolding) => {
            axios.get(`https://vivilio.herokuapp.com/api/users/${idUserHolding}/books`, { headers: {"Authorization" : `Bearer ${this.state.access_token}`} } )
                .then((res) => {this.setState({books: res.data.books })
                               //this.setState({isLoading: false})
                            })
                .catch((error) => {
                    console.log('request api error: ', error);
                }).finally(() => {this.setState({isLoading: false})
                                    this.setState({ isFetching: false })})
        });
    }


    renderItem =({item, index}) => {
        return(
            <TouchableOpacity style={styles.item}
                                onPress={() => {this.props.navigation.navigate('BooksDetail')
                                                AsyncStorage.setItem('idHolding', JSON.stringify(item.id))}}
                               >
                <Image
                    style={styles.image}
                    source={{uri: `https://vivilio.herokuapp.com${item.cover}`}}
                    resizeMode='contain'
                    />
                <View style={styles.wrapText}>
                    
                    <Text style={styles.fontSize}>{item.title}</Text>
                    <Text style={{fontSize: 14, color: '#748c94'}}>{item.description}</Text>
                </View>
                
            </TouchableOpacity>

            
        )
    }

    writeReviewForm = () =>{
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    componentDidMount(){
        AsyncStorage.getItem('idUserHolding').then((idUserHolding) => {

            axios.get(`https://vivilio.herokuapp.com/api/users/${idUserHolding}`, { headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
            .then(response => {
                //this.state.user= response.data
                this.setState({user: response.data})
                //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                //console.log(JSON.stringify(response.data.id))
                //console.log(this.state.user)
            }).catch((error) => {
                console.log(error.response.data.msg)})
            
            //this.setState({token: access_token});
            //if(access_token){
                //console.log(this.state.token);
            //} 
        });
    }

    getUserUpdate=()=>{
        AsyncStorage.getItem('idUserHolding').then((idUserHolding) => {

            axios.get(`https://vivilio.herokuapp.com/api/users/${idUserHolding}`, { headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
            .then(response => {
                //this.state.user= response.data
                this.setState({user: response.data})
                //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                //console.log(JSON.stringify(response.data.id))
                //console.log(this.state.user)
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
    
                <ImageBackground source={require('../image/top_nav2.png')}
                                style={styles.topNavImg}>
                    <View style={styles.nameContainer}>
                        <TouchableOpacity style={{position: 'absolute', left: 15}}
                                            onPress={() => this.props.navigation.goBack()}>
                                        
                                        <Image source={require('../image/left-arrow.png')}
                                        style={{width: 20, height: 20, tintColor: 'white'}}/>
                                        
                        </TouchableOpacity>

                        <View style={styles.name}>
                            <Text style={{fontSize: 25, fontWeight:'bold', color: '#fff'}}>{this.state.user.name}</Text>
                        </View>

                    </View>
    
                    
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar}
                            source={require('../image/profile.png')}
                        ></Image>
                        <View style={styles.booksContainer}>
    
                            <Text style={{fontSize: 20, color: '#fff'}}>{Object.keys(this.state.books).length}</Text>
                            <Text style={{color: '#fff'}}>Books</Text>
                        </View>
    
                        <View style={styles.followerContainer}>
    
                            <Text style={{fontSize: 20, color: '#fff'}}>0</Text>
                            <Text style={{color: '#fff'}} >Followers</Text>
                        </View>
    
                        <View style={styles.followingContainer}>
    
                            <Text style={{fontSize: 20, color: '#fff'}}>0</Text>
                            <Text style={{color: '#fff'}}>Following</Text>
                        </View>
                    </View>
    
                    
                </ImageBackground>
                    
                    
    
                <View style={styles.bioContainer}>
                    
                    <View style={styles.bioField}>
    
                    <Text style={{padding: 10}}>{this.state.user.bio}</Text>
            
                    </View>
                    
                </View>
                
                <View style={styles.editContainer}>
                        <TouchableOpacity style={styles.editField}>
                            <Text style={{fontSize: 12, color: '#748c94'}}>Follow</Text>
                        </TouchableOpacity>
                </View>
    
                <SafeAreaView style={styles.listContainer}>

                    <Text style={{marginHorizontal:30, marginBottom: 10, fontSize: 20, color:'#748c94', }}>My books</Text>
                    {
                    this.state.isLoading ? <ActivityIndicator/>: (
                        <FlatList
                        
                            data={this.state.books}
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
        flex: 1,
    },

    topNavImg:{
        width:  null,
        height: null,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        elevation: 5
    },

    avatarContainer:{
        alignContent:'center',
        flexDirection: 'row',
        marginHorizontal: 30,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10
    },

    avatar: {
        width: 50,
        height: 50,
    },

    booksContainer:{
        justifyContent: 'center',
        marginLeft:40,
        alignItems: 'center'
    },

    followerContainer:{
        justifyContent: 'center',
        marginLeft:30,
        alignItems: 'center'
    },

    followingContainer:{
        justifyContent: 'center',
        marginLeft:30,
        alignItems: 'center'
    },

    nameContainer: {
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: 'row',
    },

    name:{
        paddingBottom: 5,
        //paddingHorizontal: 30
    },

    bioContainer:{
        alignItems:'center',
        paddingTop: 15
    },

    bioField:{
        backgroundColor: '#fff',
        height: null,
        width: '85%',
        borderRadius: 10
    },

    setting: {
        //backgroundColor:'red',
        justifyContent :'center',
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 10
    },

    editContainer: {
        paddingTop: 5,
        paddingBottom: 0,
        alignItems: 'center',
        paddingHorizontal: 30
    },

    editField:{
        backgroundColor: '#fff',
        height: 18,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        width: 75,
        height: 75
    },

    wrapText:{
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },

    fontSize:{
        fontSize: 18
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

    listContainer:{
        marginTop: 10,
        height: "65%"
    }

})