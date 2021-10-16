import { assertBinary } from "@babel/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {Component} from "react";
import {Button, StyleSheet, Text, View, Image, ActivityIndicator, ImageBackground,
        TouchableOpacity, FlatList, SafeAreaView, RefreshControl, TextInput,Provider, Divider, ViewPropTypes} from 'react-native';
import axios from "axios";
import Modal from "react-native-modal";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Alert } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default class postDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            user: [],
            checked: false,
            content:'',
            idCommunityHolding: '',
            postDetailTemp: [],
            comment:'',
            postDetail:[],
            author:[],
            listComment: [],
            isFetching: false,
            isLoading: true,
            isModalVisible: false,
            idPost: '',
        };
        this.getPostDetail();
        this.getAccessToken();
        this.getUser();
        this.getIdCommunity();
        this.getListComment();
        this.getIdPost();
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    onRefresh() {
        this.setState({isFetching: true},() => {this.getListComment();
                                                });
    };

    getIdCommunity=()=>{
        AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {
            this.setState({idCommunityHolding: idCommunityHolding})
        })
    }

    getIdPost=()=>{
        AsyncStorage.getItem('idPost').then((idPost) => {
            this.setState({idPost: idPost})
        })
    }

    getPostDetail=()=>{
        AsyncStorage.getItem('allPostHolding').then((allPostHolding) => {
            var json = allPostHolding;
            var parsedArray = JSON.parse(json);
            this.setState({postDetail: parsedArray})

            var author = this.state.postDetail.author
            var stringdArray2 = JSON.stringify(author);
            var parsedArray2 = JSON.parse(stringdArray2)
            this.setState({author: parsedArray2})
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
    postComment=()=>{
            axios.post(`https://vivilio.herokuapp.com/api/communities/${this.state.idCommunityHolding}/posts/${this.state.postDetail.id}/comments`, 
                {
                    content: this.state.comment,
                }
            ,
            { headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
            .then(response => {
                //this.state.user= response.data
                this.setState({commentContent: response.data})
                //console.log(this.state.listPost)
                //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                //console.log(JSON.stringify(response.data.id))
                //console.log(this.state.user)
                //console.log(this.state.commentContent)
                this.getListComment()
            }).catch((error) => {alert("Error, try again")})
        
    }

    getListComment=()=>{
        AsyncStorage.getItem('').then(() => {

            axios.get(`https://vivilio.herokuapp.com/api/communities/${this.state.idCommunityHolding}/posts/${this.state.postDetail.id}/comments`, { headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
            .then(response => {
                //this.state.user= response.data
                this.setState({listComment: response.data.comments})
                //console.log(this.state.listPost)
                //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                //console.log(JSON.stringify(response.data.id))
                //console.log(this.state.user)
                
            }).catch((error) => {
                console.log(error.response.data.msg)})
            .finally(() => {this.setState({isLoading: false})
                                this.setState({ isFetching: false })})
        });
    }

    showModal = () =>{
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    renderItem =({item, index}) => {
        
        return(
            <TouchableOpacity style={styles.item2}
                                onPress={() => {//AsyncStorage.setItem('allPostHolding', JSON.stringify(item))
                                                //this.props.navigation.navigate('postDetail')                 
                                            }}
                                onLongPress={()=> { this.showModal()
                                                    AsyncStorage.setItem('idComment', JSON.stringify(item.id))                   
                                                    AsyncStorage.setItem('nameAuthorComment', item.author.name)                   
                                            }}
                                >
                <View style={styles.wrapText}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <View  style={{paddingTop: 5}}>
                                <Image source={require('../image/profile.png')} style={{height: 20, width: 20}}/>
                            </View>
                            <View style={{backgroundColor:'#f2f2f2', borderRadius:10, marginLeft: 10}}>
                                <Text style={styles.fontSize2}>{item.author.name}</Text>
                                <Text style={{fontSize: 14, color: '#748c94', paddingTop: 5, paddingLeft: 10, paddingRight: 10, paddingBottom: 5}}>{item.content}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
                
            </TouchableOpacity>
        )
    };

    renderHeader=()=>{
        var post= this.state.postDetail
        return(
            <View style={{borderRadius: 20, borderBottomWidth: 0.3}}>
                <View style={styles.item}>
                    <View style={styles.author}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../image/user2.png')} style={{height: 25, width: 25}}/>
                            <Text style={styles.fontSize}>{this.state.author.name}</Text>
                        </View>
                        <Text style={{fontSize: 14, color: '#748c94', paddingTop: 5}}>{post.content}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render(){
        var post= this.state.postDetail;
        return(
            <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.top_nav}
                                                    onPress={() => {this.props.navigation.goBack()}}
                                                    >
                                        
                                        <Image source={require('../image/left-arrow.png')}
                                        style={{width: 20, height: 20, tintColor: 'rgb(50,215,75)'}}/>
                        </TouchableOpacity>

                    </View>

                    { post.turn_off_commenting === true ? 
                        <View style={styles.item}>
                            <View style={styles.author}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require('../image/user2.png')} style={{height: 25, width: 25}}/>
                                    <Text style={styles.fontSize}>{this.state.author.name}</Text>
                                </View>
                                <Text style={{fontSize: 14, color: '#748c94', paddingTop: 5}}>{post.content}</Text>
                            </View>
                        </View>: null
                    }
                    
                    {post.turn_off_commenting === true ? 
                        <View style={{paddingTop: 10, }}>
                            <Text style={{alignSelf: 'center', color:'#748c94', fontSize: 20, fontWeight: 'bold'}}>This post was turned off commenting</Text>
                        </View> : null
                    }
                    
                    {post.turn_off_commenting !== true ? 
                        <View style={{flex: 1}}>
                            <SafeAreaView style={styles.listContainer}>
                            {
                                this.state.isLoading ? <ActivityIndicator/>: (
                                <FlatList
                                    data={this.state.listComment}
                                    renderItem = {this.renderItem}
                                    keyExtractor={item => `key-${item.id}`} 
                                    onRefresh={() => this.onRefresh()}
                                    refreshing={this.state.isFetching}
                                    ListHeaderComponent={this.renderHeader}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    />
                                )
        
                            }
                            </SafeAreaView>

                            <View style={{position: 'absolute', bottom: 0,height: 60, width: '100%' ,backgroundColor: 'white'}}>
                                
                                    <View style={{flexDirection: 'row',  paddingTop: 10, marginHorizontal: 20}}>
                                            
                                        <View style={{width: 345, paddingRight: 10}}>
                                            <AutoGrowingTextInput style={{backgroundColor: '#f2f2f2', borderRadius: 20 
                                                                    , paddingLeft: 10, paddingVertical: 5}}
                                                        placeholder='Comment something...'
                                                        autoCorrect={false}
                                                        onChangeText={(text) => {
                                                        this.setState({comment: text})}}/>
                                        </View>
                                            
                                        <TouchableOpacity style={{justifyContent: 'center'}}
                                                                onPress={()=> {this.postComment()}}>
                                            <Image source={require('../image/post.png')} style={{height: 17, width: 17, tintColor: 'rgb(50,215,75)'}}/>
                                        </TouchableOpacity>
                                    </View> 
                                
                            </View>
                        </View>: null
                    }

                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ width: "95%", backgroundColor: 'white', position: 'absolute', bottom: 15,
                                    backgroundColor: 'white', borderRadius: 10, justifyContent: 'center' }}>
                        <TouchableOpacity  style={{ height: 30, alignSelf:'center', borderTopLeftRadius: 10,borderTopRightRadius: 10, width: '100%',
                                                    borderColor: 'black', borderBottomWidth: 0.6 ,justifyContent: 'center', alignItems: 'center'}}
                                            onPress={()=> {
                                                            AsyncStorage.getItem('nameAuthorComment').then((nameAuthorComment) => {
                                                            if(this.state.user.name === nameAuthorComment){
                                                                this.props.navigation.navigate('updateComment'),
                                                                this.showModal()
                                                            }else{alert("This comment is yours"),
                                                                    this.showModal()}
                                                        })
                                                        }}>
                            <Text>Edit</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity  style={{ height: 30, alignSelf:'center', borderTopLeftRadius: 10,borderTopRightRadius: 10, width: '100%',
                                                    borderColor: 'black', borderBottomWidth: 0.6 ,justifyContent: 'center', alignItems: 'center'}}
                                                    onPress={()=> {this.showModal(),
                                                        Alert.alert(
                                                            'Are you sure to delete this comment?',
                                                            'This comment will be deleted from database',
                                                            [
                                                                {
                                                                    text: 'Cancel',
                                                                    onPress: () => console.log('Cancel Pressed'),
                                                                    style: 'cancel',
                                                                },
                                                                {text: 'OK', onPress: () => {
                                                                    AsyncStorage.getItem('nameAuthorComment').then((nameAuthorComment) => {
                                                                        if(this.state.user.name === nameAuthorComment){
                                                                            
                                                                            AsyncStorage.getItem('idComment').then((idComment) => {
                                                                            console.log(`https://vivilio.herokuapp.com/api/communities/${this.state.idCommunityHolding}/posts/${this.state.idPost}/comments/${idComment}`)
                                                                            axios.delete(`https://vivilio.herokuapp.com/api/communities/${this.state.idCommunityHolding}/posts/${this.state.idPost}/comments/${idComment}` , 
                                                                            { headers: {"Authorization" : `Bearer ${this.state.access_token}`} } )
                                                                            .then((res) => {//this.setState({book: res.data })
                                                                                       //this.setState({isLoading: false})
                                                                                       //console.log(this.state.book)
                                                                                       alert("Successfully")
                                                                                       console.log("Successfully")
                                                                                    })
                                                                            .catch((error) => {
                                                                                console.log('request api error: ', error);
                                                                                })
                                                                            }) 
                                                                        }else{alert("This comment is yours")}
                                                                    })
                                                                ;}},
                                                            ],
                                                            {cancelable: false},
                                                        );
                                                    }}
                                                    >
                                        <Text>Delete</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity  style={{ height: 30,borderRadius: 10, alignSelf:'center',
                                                            justifyContent: 'center', alignItems: 'center'}}
                                                    onPress={()=> {this.showModal()}}>
                                        <Text style={{paddingBottom: 5}}>Cancel</Text>
                            </TouchableOpacity>  
                    </View>    
                         
                </Modal>
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
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    wrapText:{
        flexDirection: 'row',
        flex: 1,
        marginLeft: 10,
        paddingBottom: 5
    },

    fontSize:{
        fontSize: 18,
        fontWeight: '700',
        paddingLeft: 10,
    },

    fontSize2:{
        fontSize: 15,
        fontWeight: '600',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5
    },

    item:{
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 5,
    },
    item2:{
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 15
    },
    author:{
        paddingLeft: 15,
        paddingTop: 5
    },
    listContainer:{
        width: '95%',
        height: '88%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 20
    },
})