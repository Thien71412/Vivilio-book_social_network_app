import React, {Component} from "react";
import {ImageBackground, StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, FlatList} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            books: [],
            books2: [],
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
        this.setState({isFetching: true,},() => {this.getListUserBook();});
    }

    getListUserBook = () => {
        AsyncStorage.getItem('idUserHolding').then((idUserHolding) => {
            axios.get(`https://vivilio.herokuapp.com/api/users/2/books`, { headers: {"Authorization" : `Bearer ${this.state.access_token}`} } )
                .then((res) => {this.setState({books: res.data.books })
                               //this.setState({isLoading: false})
                            })
                .catch((error) => {
                    console.log('request api error: ', error);
                }).finally(() => {this.setState({isLoading: false})
                                    this.setState({ isFetching: false })})
        });
    }

    getListUserBook = () => {
        AsyncStorage.getItem('idUserHolding').then((idUserHolding) => {
            axios.get(`https://vivilio.herokuapp.com/api/users/1/books`, { headers: {"Authorization" : `Bearer ${this.state.access_token}`} } )
                .then((res) => {this.setState({books2: res.data.books })
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

    renderItem2 =({item, index}) => {
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

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.imgBackground} source={require('../image/top_nav2.png')} >
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../image/logo.png')}></Image>
                    </View>
                </ImageBackground>
    

                <SafeAreaView style={styles.listContainer}>

                    <Text style={{marginHorizontal:30, marginBottom: 10, fontSize: 20, color:'#748c94', }}>New Book</Text>
                    {
                    this.state.isLoading ? <ActivityIndicator/>: (
                        <FlatList
                        
                            data={this.state.books2}
                            renderItem = {this.renderItem2}
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
        );
    }
}
    
const styles=StyleSheet.create({
    container:{
        flex: 1,
    },

    imgBackground:{
        width:  null,
        height: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        elevation: 5
    },

    logoContainer:{
        alignItems: 'center',
        paddingVertical: 5
    },

    logo:{
        width: 80,
        height: 50,
        
    },

    image: {
        width: 100,
        height: 100
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
        height: '78%'
    }
})
