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


export default class groupDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            group: [],
            user: [],
            content: '',
            checked: false,
            post: [],
            listPost:[],
            listComment: [],
            isFetching: false,
            isLoading: true,
            isModalVisible: false,
            numberOfComment: '',
            idCommunityHolding: '',
            comment: '',
            commentContent: [],
            numberOfMember: '',
        };
        this.getAccessToken();
        this.getIdCommunityHolding();
        this.getUser();
        this.getListPost();
        this.getNumberOfMember();
        this.getGroupDetail();
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    onRefresh() {
        this.setState({isFetching: true},() => {this.getListPost()
                                                this.getNumberOfMember()});
    };

    getGroupDetail=()=>{
        AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {
            axios.get( `https://vivilio.herokuapp.com/api/communities/${idCommunityHolding}` , { headers: {"Authorization" : `Bearer ${this.state.access_token}`} } )
                .then((res) => {this.setState({group: res.data })
                               //this.setState({isLoading: false})
                               //console.log(this.state.books)
                            })
                .catch((error) => {
                    console.log('request api error: ', error);
                })
        });
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

    componentDidMount(){
        this.getListPost();
    }

    createPost=()=>{
        AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {

            axios.post(`https://vivilio.herokuapp.com/api/communities/${idCommunityHolding}/posts`, 
               { 
                content: this.state.content,
                turn_off_commenting: this.state.checked
               }
            ,{ headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
            .then(response => {
                //this.state.user= response.data
                this.setState({post: response.data})
                //console.log(this.state.post)
                //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                //console.log(JSON.stringify(response.data.id))
                //console.log(this.state.user)
                this.getListPost()
                alert("Posting successfully")
            }).catch((error) => {
                console.log(error.response.data.msg)})
        });
    }

    getIdCommunityHolding=()=>{
        AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {
            this.setState({idCommunityHolding: idCommunityHolding})
        })
    }
    

    getListPost=()=>{
        AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {

            axios.get(`https://vivilio.herokuapp.com/api/communities/${idCommunityHolding}/posts`, { headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
            .then(response => {
                //this.state.user= response.data
                this.setState({listPost: response.data.posts})
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

    postComment=()=>{
        AsyncStorage.getItem('idPost').then((idPost) => {
            axios.post(`https://vivilio.herokuapp.com/api/communities/${this.state.idCommunityHolding}/posts/${idPost}/comments`, 
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
                console.log(this.state.commentContent)
                alert("Comment successfully")
            }).catch((error) => {alert("Error, try again")})
        })
    }

    showModal = () =>{
        this.setState({isModalVisible: !this.state.isModalVisible});
    }


    renderItem =({item, index}) => {
        
        return(
            <TouchableOpacity style={styles.item}
                                onPress={() => {AsyncStorage.setItem('allPostHolding', JSON.stringify(item))
                                                AsyncStorage.setItem('idPost', JSON.stringify(item.id))  
                                                this.props.navigation.navigate('postDetail')                 
                                            }}
                                onLongPress={()=> {this.showModal()
                                                    AsyncStorage.setItem('idPost', JSON.stringify(item.id))                   
                                                    AsyncStorage.setItem('idAuthorPost', item.author.name)                   
                                            }}
                                >
                <View style={styles.wrapText}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../image/user2.png')} style={{height: 25, width: 25}}/>
                            <Text style={styles.fontSize}>{item.author.name}</Text>
                        </View>
                        <Text style={{fontSize: 14, color: '#748c94', paddingTop: 5}}>{item.content}</Text>
                    </View>
                </View>
                
                {item.turn_off_commenting !== true ? 
                        <View style={{flexDirection: 'row',  paddingTop: 10}}>
                            
                            <View style={{width: 345}}>
                                <AutoGrowingTextInput style={{backgroundColor: '#f2f2f2', marginHorizontal: 10, borderRadius: 20 
                                                    , paddingLeft: 10, paddingVertical: 5}}
                                        placeholder='Comment something...'
                                        autoCorrect={false}
                                        onChangeText={(text) => {
                                        this.setState({comment: text})}}/>
                            </View>
                            
                            <TouchableOpacity style={{justifyContent: 'center'}}
                                                onPress={()=> {AsyncStorage.setItem('idPost', JSON.stringify(item.id))
                                                                this.postComment()}}>
                                <Image source={require('../image/post.png')} style={{height: 17, width: 17, tintColor: 'rgb(50,215,75)'}}/>
                            </TouchableOpacity>
                        </View> : null
                }
                
                

            </TouchableOpacity>
        )
    };

    getNumberOfMember=()=>{
        AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {
            axios.get(`https://vivilio.herokuapp.com/api/communities/${this.state.idCommunityHolding}/members`, 
            { headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
            .then(response => {
                //this.state.user= response.data
                this.setState({numberOfMember: Object.keys(response.data).length})
                
                //console.log(this.state.listPost)
                //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                //console.log(JSON.stringify(response.data.id))
                //console.log(this.state.user)
                //console.log(this.state.commentContent)
                //alert("Comment successfully")
            }).catch((error) => {console.log("Error, try again")})

        })
        
    }

    renderHeader =() =>{
        return(
            <View>
                <TouchableOpacity style={styles.groupInforContainer}
                                    onPress={()=> this.props.navigation.navigate('GroupInfor')}>
                    <View style={styles.groupInfor}>
                        <View>
                            <Text style={{fontSize: 20, fontWeight: '600'}}>{this.state.group.name}</Text>
                            <Text style={{fontSize: 12, fontWeight: '100'}}>{this.state.group.description}</Text>
                            <Text style={{fontSize: 10, fontWeight: '100', color: '#748c94', paddingTop: 2}}>Members: {this.state.numberOfMember} </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.createPost}>
                    <View style={styles.user}>
                        <Image style={{height: 25, width: 25}} source={require('../image/profile.png')}></Image>
                        <View style={{justifyContent: 'center', paddingLeft: 10}}>
                            <Text>{this.state.user.name}</Text>
                        </View>
                    </View>
                    <AutoGrowingTextInput  style={{backgroundColor: '#f2f2f2', marginHorizontal: 20, borderRadius: 20, paddingTop: 10, paddingLeft: 10}}
                                placeholder='Post something...'
                                autoCorrect={false}
                                onChangeText={(text) => {
                                this.setState({content: text})}}
                                > 

                    </AutoGrowingTextInput>

                    <View>
                        <View style={styles.checkBox}>
                            <View style={{ width: 170, height: 30, flexDirection: 'row', borderRadius: 20, backgroundColor: '#f2f2f2'}}>
                                <View style={{flexDirection: 'row', paddingLeft: 12}}>
                                    <CheckBox
                                    value={this.state.checked}
                                    onValueChange={() => this.setState({ checked: !this.state.checked })}
                                        //disabled={false}
                                        //defaultChecked={this.state.isChecked}
                                        //onValueChange={this.toggleChange}
                                    />
                                    <View style={{justifyContent: 'center'}}>
                                        <Text style={{color: 'grey'}}>Disable comment</Text>
                                    </View>
                                </View>
                            </View>
                                
                            <TouchableOpacity style={{ position: 'absolute', right: 20, top: 10, }}
                                                onPress={()=> this.createPost()}>
                                <View   View  style={{width:170,height: 30 ,backgroundColor: 'rgb(50,215,75)', alignItems: 'center', 
                                        justifyContent: 'center', borderRadius: 20}}>
                                    <Text style={{color: 'white'}}>Post</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.imgBackground} source={require('../image/top_nav2.png')} >
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.top_nav}
                                                    onPress={() => this.props.navigation.goBack()}>
                                        
                                        <Image source={require('../image/left-arrow.png')}
                                        style={{width: 20, height: 20, tintColor: 'white'}}/>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>

                <SafeAreaView style={styles.listContainer}>
                    {
                    this.state.isLoading ? <ActivityIndicator/>: (
                        <FlatList
                            data={this.state.listPost}
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

                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ width: "95%", backgroundColor: 'white', position: 'absolute', bottom: 15,
                                        backgroundColor: 'white', borderRadius: 10, justifyContent: 'center' }}>
                               <TouchableOpacity  style={{ height: 30, alignSelf:'center', borderTopLeftRadius: 10,borderTopRightRadius: 10, width: '100%',
                                                           borderColor: 'black', borderBottomWidth: 0.6 ,justifyContent: 'center', alignItems: 'center'}}
                                                    onPress={()=> {
                                                        AsyncStorage.getItem('idAuthorPost').then((idAuthorPost) => {
                                                            if(this.state.user.name === idAuthorPost){
                                                                this.props.navigation.navigate('UpdatePost'),
                                                                this.showModal()
                                                            }else{alert("This post is yours"),
                                                                    this.showModal()}
                                                        })
                                                        }}>
                                        <Text>Edit</Text>
                                </TouchableOpacity> 
                                <TouchableOpacity  style={{ height: 30, alignSelf:'center', borderTopLeftRadius: 10,borderTopRightRadius: 10, width: '100%',
                                                           borderColor: 'black', borderBottomWidth: 0.6 ,justifyContent: 'center', alignItems: 'center'}}
                                                    onPress={()=> {this.showModal(),
                                                        Alert.alert(
                                                            'Are you sure to delete this post?',
                                                            'This post will be deleted from database',
                                                            [
                                                                {
                                                                    text: 'Cancel',
                                                                    onPress: () => console.log('Cancel Pressed'),
                                                                    style: 'cancel',
                                                                },
                                                                {text: 'OK', onPress: () => {
                                                                    AsyncStorage.getItem('idAuthorPost').then((idAuthorPost) => {
                                                                        if(this.state.user.name === idAuthorPost){
                                                                            AsyncStorage.getItem('idPost').then((idPost) => {
                                                                            axios.delete(`https://vivilio.herokuapp.com/api/communities/${this.state.idCommunityHolding}/posts/${idPost}` , 
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
                                                                        }else{alert("This post is yours")}
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
    groupInforContainer:{
        height: 90,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10
    },
    groupInfor:{
        flexDirection: 'row',
        paddingTop: 15,
        paddingHorizontal: 20
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
    listContainer:{
        width: '95%',
        height: '93%',
        backgroundColor: '#f2f2f2',
        alignSelf: 'center'
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
        paddingLeft: 10
    },

    item:{
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 10,
    },

    imgBackground:{
        width:  null,
        height: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        justifyContent: 'center',
        marginBottom: 10
    },
})
