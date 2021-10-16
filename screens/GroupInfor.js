import { assertBinary } from "@babel/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {Component} from "react";
import {Button, StyleSheet, Text, View, Image, ActivityIndicator, ImageBackground,
        TouchableOpacity, FlatList, SafeAreaView, RefreshControl, TextInput,Provider, Alert, ViewPropTypes} from 'react-native';
import axios from "axios";
import CheckBox from "@react-native-community/checkbox";
import Modal from "react-native-modal";
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default class GroupInfor extends Component{
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            user: [],
            checked: false,
            content:'',
            idCommunityHolding: '',
            idPost: '',
            group: [],
            nameCreator:'',
            numberOfMember: '',
            meberList: [],
            isFetching: false,
            isLoading: true,
            isModalVisible: false,
            user_id: '',
            role: '',
        };
        this.getAccessToken();
        this.getUser();
        this.getIdCommunity();
        this.getIdPost();
        this.getMemberList();
        this.getGroupDetail();
        this.getNumberOfMember();
        this.getCreator();
        
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    onRefresh() {
        this.setState({isFetching: true},() => {this.getMemberList();});
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

    getCreator=()=>{
        
        AsyncStorage.getItem('nameCreator').then((nameCreator) => {
            this.setState({nameCreator: nameCreator })
        })
        
        
    }

    showModal = () =>{
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

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

    getMemberList=()=>{
        AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {

            axios.get(`https://vivilio.herokuapp.com/api/communities/${idCommunityHolding}/members`, { headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
            .then(response => {
                //this.state.user= response.data
                this.setState({meberList: response.data})
                //console.log(this.state.listPost)
                //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                //console.log(JSON.stringify(response.data.id))
                //console.log(this.state.meberList)
            }).catch((error) => {
                console.log(error.response.data.msg)})   
            .finally(() => {this.setState({isLoading: false})
                this.setState({ isFetching: false })})     
        });
    }

    renderItem =({item, index}) => {
        
        return(
            <TouchableOpacity style={styles.item}
                                onPress={() => {//AsyncStorage.setItem('allPostHolding', JSON.stringify(item))
                                                //AsyncStorage.setItem('idPost', JSON.stringify(item.id))  
                                                //this.props.navigation.navigate('postDetail')                 
                                            }}
                                onLongPress={() => {AsyncStorage.setItem('idMember',  JSON.stringify(item.profile.id)), 
                                            Alert.alert(
                                            'Handle this Member',
                                            'Choose',
                                            [
                                                {text: 'Delete', onPress: () => {Alert.alert(
                                                    'Are you sure to delete this member?',
                                                    'This review will be deleted from this group',
                                                    [
                                                        {
                                                            text: 'Cancel',
                                                            onPress: () => console.log('Cancel Pressed'),
                                                            style: 'cancel',
                                                        },
                                                        {text: 'OK', onPress: () =>
                                                            { console.log(item.user_id)
                                                                if(item.profile.name !== this.state.nameCreator){
                                                                AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {
                                                                    axios.delete( `https://vivilio.herokuapp.com//api/communities/${idCommunityHolding}/members/${item.profile.id}` , 
                                                                    { headers: {"Authorization" : `Bearer ${this.state.access_token}`} } )
                                                                    .then((res) => {//this.setState({book: res.data })
                                                                                //this.setState({isLoading: false})
                                                                                //console.log(this.state.book)
                                                                                alert("Successfully")
                                                                                console.log(res.data)
                                                                                })
                                                                    .catch((error) => {
                                                                        console.log('request api error: ', error);
                                                                    })
                                                                })
                                                                }else{
                                                                    alert("You aren't group creator")
                                                                }
                                                        ;}},
                                                    ],
                                                    {cancelable: false},
                                                );
        
                                                }},
                                                {text: 'Edit', onPress: () => {
                                                    if(item.profile.name !== this.state.nameCreator){
                                                        this.props.navigation.navigate('UpdateMember');
                                                    }else alert("You aren't group creator")
                                                        
                                                }},
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                            ],
                                            {cancelable: false},
                                        );}}            
                                >
                <View style={styles.wrapText}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../image/user2.png')} style={{height: 25, width: 25}}/>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={styles.fontSize}>{item.profile.name}</Text>
                                <Text style={{fontSize: 10, color:'#748c94', paddingLeft: 10}}>{item.role.type}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    

    addMember=()=>{
        var found = false;
            for(var i = 0; i < this.state.meberList.length; i++) {
                if (this.state.meberList[i].profile.id === this.state.user_id) {
                    found = true;
                    break;
                }
            }
        console.log(this.state.user_id)

        if(found !==true){
            AsyncStorage.getItem('idCommunityHolding').then((idCommunityHolding) => {
                
                    axios.post(`https://vivilio.herokuapp.com/api/communities/${idCommunityHolding}/members`, 
                    {
                        user_id: this.state.user_id,
                        role: this.state.role
                    }
                    ,{ headers: {"Authorization" : `Bearer ${this.state.access_token}`} })
                        .then(response => {
                            //this.state.user= response.data
                            //this.setState({meberList: response.data})
                            //console.log(this.state.listPost)
                            //AsyncStorage.setItem('idUser', JSON.stringify(response.data.id))
                            //console.log(JSON.stringify(response.data.id))
                            //console.log(this.state.meberList)
                            alert("User joined the group")
                            this.props.navigation.navigate('groupDetail')
                        }).catch((error) => {
                            console.log(error)})
                    })
        }else {alert("User has been in group already")}
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
                        <View style={styles.groupInfor}>
                            <View>
                                <Text style={{fontSize: 20, fontWeight: '600'}}>{this.state.group.name}</Text>
                                <Text style={{fontSize: 12, fontWeight: '100'}}>{this.state.group.description}</Text>
                                <Text style={{fontSize: 10, fontWeight: '100', color: '#748c94', paddingTop: 2}}>Group creator: {this.state.nameCreator} </Text>
                                <Text style={{fontSize: 10, fontWeight: '100', color: '#748c94', paddingTop: 2, marginBottom: 10}}>Members: {this.state.numberOfMember} </Text>
                            </View>
                        </View>
                    </View>

                    <Text style={{fontSize: 20, fontWeight: '600', color: '#748c94', marginLeft: 20, paddingBottom: 10}}>Member List</Text>

                    <SafeAreaView style={styles.listContainer}>
                    {
                    this.state.isLoading ? <ActivityIndicator/>: (
                        <FlatList
                            data={this.state.meberList}
                            renderItem = {this.renderItem}
                            keyExtractor={item => `key-${item.id}`} 
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            //ListHeaderComponent={this.renderHeader}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            />
                        )

                    }
                    </SafeAreaView>

                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ height: "40%", width: "90%", backgroundColor:'white',  justifyContent: 'center', borderRadius: 20, alignSelf: 'center' }}>
                                <View style={{padding: 15}}>
                                    <Text style={{fontSize: 20}}>User Id</Text>
                                    <View style={{backgroundColor: '#f2f2f2', height: 40,
                                                width: '100%', paddingLeft: 10,borderRadius: 20,}}>
                                    <TextInput 
                                        autoCorrect={false}
                                        multiline={true}
                                        onChangeText={(text) => {
                                        this.setState({user_id: text})}}/>
                                    </View>
                                </View>

                                <View style={{padding: 15}}>
                                    <Text style={{fontSize: 20}}>Role</Text>
                                    <View style={{backgroundColor: '#f2f2f2', height: 40,
                                                width: '100%', paddingLeft: 10,borderRadius: 20,}}>
                                    <TextInput 
                                        autoCorrect={false}
                                        multiline={true}
                                        onChangeText={(text) => {
                                        this.setState({role: text})}}/>
                                    </View>
                                </View>               
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity style={{backgroundColor: 'rgb(50,215,75)', height: 30, width: 80, marginRight: 15,
                                                            justifyContent: 'center', alignItems: 'center', borderRadius: 10}}
                                                            onPress={() => { this.addMember()}}>
                                    <Text style={{color: 'white',}}>Add</Text>
                                </TouchableOpacity>

                                <TouchableOpacity  style={{ backgroundColor: '#f2f2f2',height: 30, width: 80,borderRadius: 10, 
                                                            justifyContent: 'center', alignItems: 'center'}}
                                                    onPress={this.showModal}>
                                        <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>       
                    </Modal>

                    <TouchableOpacity style={{ position: 'absolute', bottom: 15 , alignSelf: 'center'}}
                                    onPress={()=> this.showModal()}>
                        <View style={{backgroundColor: 'rgb(50,215,75)', height: 30, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
                            <Text style={{color: 'white', fontWeight: '800'}}>Add Member</Text>
                        </View>
                    </TouchableOpacity>
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
        paddingVertical: 10,
        alignSelf: 'center'
    },
    groupInfor:{
        flexDirection: 'row',
        paddingTop: 15,
        paddingHorizontal: 20
    },

    wrapText:{
        flexDirection: 'row',
        flex: 1,
        marginLeft: 10,
    },

    fontSize:{
        fontSize: 15,
        fontWeight: '600',
        paddingLeft: 10
    },
    listContainer:{
        width: '95%',
        height: '63%',
        backgroundColor: '#f2f2f2',
        alignSelf: 'center'
    },
    item:{
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 3,
        marginBottom: 8
    },
})