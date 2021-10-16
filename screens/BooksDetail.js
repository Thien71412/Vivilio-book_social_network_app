import { assertBinary } from "@babel/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {Component} from "react";
import {Button, StyleSheet, Text, View, Image, ActivityIndicator, 
        TouchableOpacity, FlatList, SafeAreaView, RefreshControl, TextInput,Provider, Divider} from 'react-native';
import axios from "axios";
import Modal from "react-native-modal";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Alert } from "react-native";
import Moment from 'react-moment';
import moment from "moment";



export default class BooksDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            token: '',
            user: [],
            books: [],
            author:[],
            reviews: [],
            isFetching: false,
            isLoading: true,
            uriDetail: '',
            uriDelete: '',
            uriReview: '',
            uriDeleteReview: '',
            idBooks: '',
            idReview: '',
            isModalVisible: false,
            overview: '',
            content:'' ,
            star: null,
            started: '',
            finished: '',
            menuVisible: '',
            idUser: '',
            BooksStatistics:[],
        };
        this.getAccessToken();
        this.getIdHolding();
        this.getListReviews();
        this.getIdUser();
        this.getBooksStatistics()
    }

    getAccessToken=()=>{
        AsyncStorage.getItem('access_token').then((access_token) => {
            this.setState({access_token: access_token})
        })
    }

    getIdUser=()=>{
        AsyncStorage.getItem('idUser').then((idUser)=>{
            this.setState({idUser: idUser})
        })
    }
    
    onRefresh() {
        this.setState({isFetching: true,},() => {this.getListReviews();
                                                this.getBooksStatistics()});
    }

    componentDidMount(){
        this.getBookDetail()
    }
    
    UNSAFE_componentWillMount(prevProps){
        AsyncStorage.getItem("idHolding").then((idHolding) => {
            this.setState({uriDetail: `https://vivilio.herokuapp.com/api/books/${idHolding}`});
            this.setState({uriDelete: `https://vivilio.herokuapp.com/api/books/${idHolding}`});
            this.setState({uriDeleteReview: `https://vivilio.herokuapp.com/api/books/${idHolding}/reviews/${this.state.idReview}`});
            
        })
        .then(res => {
            //do something else
        });
    }

    getBookDetail = () => {
        AsyncStorage.getItem('access_token').then((access_token) => {
            axios.get( this.state.uriDetail , { headers: {"Authorization" : `Bearer ${access_token}`} } )
                .then((res) => {this.setState({books: res.data.book })
                                this.setState({author: res.data.author })
                               //this.setState({isLoading: false})
                               //console.log(this.state.books)
                            })
                .catch((error) => {
                    console.log('request api error: ', error);
                })
        });
    }

    getIdHolding= () =>{
        AsyncStorage.getItem('idHolding').then((idHolding) => {
            this.setState({idBooks: idHolding})
        })
    }
    
    getListReviews = () => {
        
        AsyncStorage.getItem('access_token').then((access_token) => {
            
            axios.get(`https://vivilio.herokuapp.com/api/books/${this.state.idBooks}/reviews`, { headers: {"Authorization" : `Bearer ${access_token}`} } )
                .then((res) => {this.setState({reviews: res.data.reviews })
                               //this.setState({isLoading: false})
                            })
                
                .catch((error) => {
                    console.log('request api error: ', error);
                }).finally(() => {this.setState({isLoading: false})
                                    this.setState({ isFetching: false })})
        });
    }

    postReview =()=> {
        AsyncStorage.getItem('access_token').then((access_token) => {
            
            axios.post(`https://vivilio.herokuapp.com/api/books/${this.state.idBooks}/reviews`, 
            {
                overview: this.state.overview,
                content: this.state.content,
                star: this.state.star,
                started: this.state.started,
                finished: this.state.finished,
            }
            ,{ headers: {"Authorization" : `Bearer ${access_token}`} } )
                .then((res) => {//this.setState({reviews: res.data.reviews })
                               //this.setState({isLoading: false})
                               console.log(res.data)
                               alert("successfully Postting review")
                            })
                .catch((error) => {
                    console.log('request api error: ', error);
                })
        });
    }

    getIDReview=() =>{
        AsyncStorage.getItem('idReview').then((idReview)=>{
            this.setState({idReview: idReview})
        });
    }

    renderItem =({item, index}) => {
        
        return(
            <TouchableOpacity style={styles.item}
                                
                                onLongPress={() => {AsyncStorage.setItem('idReview',  JSON.stringify(item.id)), this.getIDReview(),
                                    Alert.alert(
                                    'Handle this review',
                                    'Choose',
                                    [
                                        {text: 'Delete review', onPress: () => {Alert.alert(
                                            'Are you sure to delete this review?',
                                            'This review will be deleted from database',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                {text: 'OK', onPress: () =>
                                                    { console.log(item.user_id)
                                                        if(this.state.idUser === JSON.stringify(item.user_id)){
                                                        axios.delete( `${this.state.uriDelete}/reviews/${this.state.idReview}` , { headers: {"Authorization" : `Bearer ${this.state.access_token}`} } )
                                                            .then((res) => {//this.setState({book: res.data })
                                                                        //this.setState({isLoading: false})
                                                                        //console.log(this.state.book)
                                                                        alert("Successfully")
                                                                        console.log(res.data)
                                                                        })
                                                            .catch((error) => {
                                                                console.log('request api error: ', error);
                                                            })
                                                        }else{
                                                            alert("This review is not yours")
                                                        }
                                                ;}},
                                            ],
                                            {cancelable: false},
                                        );

                                        }},
                                        {text: 'Edit review', onPress: () => {
                                            if(this.state.idUser === JSON.stringify(item.user_id)){
                                                this.props.navigation.navigate('updateReview');
                                            }else{
                                                alert("This review is not yours")
                                            }
                                        }},
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                    ],
                                    {cancelable: false},
                                );}}
                               
                                                //AsyncStorage.setItem('idHolding', JSON.stringify(item.id))
                                                    >
                <View style={styles.wrapText}>
                    <View>
                        <Text style={{color: '#748c94', fontSize: 17 ,fontStyle:'italic'}}>{item.author}</Text>
                    </View>
                    
                    
                    <View style={{flexDirection: "row", }}>
                        <View style={{justifyContent: 'center', paddingRight: 10}}>
                            <Text>
                                {item.star == 1 ?  <View style={styles.starContainer}>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image  style={styles.unStar} source={require('../image/star.png')}/>
                                                                <Image  style={styles.unStar} source={require('../image/star.png')}/>
                                                                <Image  style={styles.unStar} source={require('../image/star.png')}/>
                                                                <Image  style={styles.unStar} source={require('../image/star.png')}/>
                                                        </View>: null
                                }
                                {item.star == 2 ?  <View style={styles.starContainer}>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image  style={styles.unStar} source={require('../image/star.png')}/>
                                                                <Image  style={styles.unStar} source={require('../image/star.png')}/>
                                                                <Image  style={styles.unStar} source={require('../image/star.png')}/>
                                                        </View>: null
                                }
                                {item.star == 3 ?  <View style={styles.starContainer}>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.unStar} source={require('../image/star.png')}/>
                                                                <Image style={styles.unStar} source={require('../image/star.png')}/>
                                                        </View>: null
                                }   
                                {item.star == 4 ?  <View style={styles.starContainer}>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.unStar} source={require('../image/star.png')}/>
                                                        </View>: null
                                }         
                                {item.star == 5 ?  <View style={styles.starContainer}>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                                <Image style={styles.star} source={require('../image/star.png')}/>
                                                        </View>: null
                                } 
                            </Text>
                        </View>

                        <View  >
                            <Text style={styles.fontSize}>{item.overview}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 12, color: '#748c94'}}>Started at </Text>
                        <Text style={{fontSize: 12, color: '#748c94'}}>{moment(item.started).format("DD/MM/YYYY")}</Text>  
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 12, color: '#748c94'}}>Finished at </Text>
                        <Text style={{fontSize: 12, color: '#748c94'}}>{moment(item.finished).format("DD/MM/YYYY")}</Text>  
                    </View>
                    
                    <Text style={{fontSize: 14, }}>{item.content}</Text>
                </View>
                
            </TouchableOpacity>

            
        )
    }

    writeReviewForm = () =>{
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    getBooksStatistics = () =>{
        AsyncStorage.getItem('idHolding').then((idHolding) => {
            axios.get( `https://vivilio.herokuapp.com/api/books/${idHolding}/statistics` , { headers: {"Authorization" : `Bearer ${this.state.access_token}`} } )
                .then((res) => {this.setState({BooksStatistics: res.data })
                                //console.log(this.state.BooksStatistics)
                               //this.setState({isLoading: false})
                               //console.log(this.state.books)
                            })
                .catch((error) => {
                    console.log('request api error: ', error);
                })
        })
            
    }

    renderHeader =() =>{
        return(
            <View style={styles.scrollView}>
                <View style={styles.bookContainer}>
                        
                        <Image  style={{height: 250, width: 250}}
                                source={{uri: `https://vivilio.herokuapp.com${this.state.books.cover}`}}
                                resizeMode='contain'
                                >
                        </Image>
                </View>

                <View style={styles.bookInfor}>
                        <View style={styles.bookName}>
                                <Text style={{fontSize: 25, fontWeight: '800'}}>{this.state.books.title}</Text>
                        </View>

                        <Text>
                        {this.state.BooksStatistics.avg_star == 0  ?  <View style={styles.starContainer}>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                            </View>: null
                       }
                       {this.state.BooksStatistics.avg_star > 0 && this.state.BooksStatistics.avg_star < 0.5 ?  <View style={styles.starContainer}>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                            </View>: null
                       }
                       {this.state.BooksStatistics.avg_star >= 0.5 && this.state.BooksStatistics.avg_star < 1.5 ?  <View style={styles.starContainer}>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image  style={styles.unStar2} source={require('../image/star.png')}/>
                                            </View>: null
                       }
                       {this.state.BooksStatistics.avg_star >= 1.5 && this.state.BooksStatistics.avg_star < 2.5 ?  <View style={styles.starContainer}>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image style={styles.unStar2} source={require('../image/star.png')}/>
                                            </View>: null
                       }   
                       {this.state.BooksStatistics.avg_star >= 2.5 && this.state.BooksStatistics.avg_star < 3.5 ?  <View style={styles.starContainer}>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.unStar2} source={require('../image/star.png')}/>
                                                    <Image style={styles.unStar2} source={require('../image/star.png')}/>
                                            </View>: null
                       }         
                       {this.state.BooksStatistics.avg_star >= 3.5 && this.state.BooksStatistics.avg_star < 4.5 ?  <View style={styles.starContainer}>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.unStar2} source={require('../image/star.png')}/>
                                            </View>: null
                       } 
                       {this.state.BooksStatistics.avg_star >=4.5 && this.state.BooksStatistics.avg_star <= 5 ?  <View style={styles.starContainer}>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                                    <Image style={styles.star2} source={require('../image/star.png')}/>
                                            </View>: null
                       } 
                    </Text>

                        <View style={{ paddingBottom: 10, paddingTop: 5}}>
                                <Text style={{fontSize: 15,fontWeight: 'bold' ,color:'#748c94'}}>Description</Text>
                                <Text style={{fontSize: 13, color:'#748c94'}}>{this.state.books.description}</Text>

                        </View>

                        <View style={{paddingBottom: 10, }}>
                                <Text style={{fontSize: 15,fontWeight: 'bold' ,color:'#748c94'}}>Author</Text>
                                <Text style={{fontSize: 13, color:'#748c94'}}>{this.state.author.name}</Text>

                        </View>

                        <View>
                                <Text style={{fontSize: 15,fontWeight: 'bold' ,color:'#748c94'}}>Statistics</Text>

                        </View>

                        <View style={{flexDirection: 'row', paddingHorizontal: 44, paddingTop: 10}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 30, color:'#FFBF00'}}>{this.state.BooksStatistics.avg_star}</Text>
                                    <Text style={{color:'#748c94', fontWeight: '700'}}>Average Star</Text>
                                </View>
                                <View style={{position: 'absolute', right: 37, alignItems: 'center',paddingTop: 10}}>
                                    <Text style={{fontSize: 30, color:'#FFBF00'}}>{this.state.BooksStatistics.avg_duration_to_finish}</Text>
                                    <View style={{}}>
                                        <Text style={{color:'#748c94', fontWeight: '700'}}>Avg reading time</Text>
                                    </View>
                                </View>
                               
                        </View>

                        <View style={{flexDirection: 'row', paddingHorizontal: 35, paddingBottom: 10}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 30, color:'#FFBF00'}}>{this.state.BooksStatistics.positive}</Text>
                                    <Text style={{color:'#748c94', fontWeight: '700'}}>Postive reviews</Text>
                                </View>

                                <View style={{position: 'absolute', right: 35, alignItems: 'center'}}>
                                    <Text style={{fontSize: 30, color:'#FFBF00'}}>{this.state.BooksStatistics.negative}</Text>
                                    <View style={{}}>
                                        <Text style={{color:'#748c94', fontWeight: '700'}}>Negative reviews</Text>
                                    </View>
                                </View>
                        </View>

                        <View>
                                <Text style={{fontSize: 15,fontWeight: 'bold' ,color:'#748c94'}}>Reviews</Text>

                        </View>
                    </View>

            </View>
        )
    }

    renderFooter =() => {
        return(
            <View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={{height: 30, width: 140,  borderColor: '#748c94', borderWidth: 0.8,
                                                        justifyContent: 'center', alignItems: 'center', borderRadius: 10}}
                                                        onPress={this.writeReviewForm}>
                        <Text style={{fontWeight: '400'}}>Write your review</Text>
                    </TouchableOpacity>

                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 1, height: 50, width: "95%", backgroundColor: 'white', alignSelf: 'center', 
                                        backgroundColor: 'white', borderRadius: 10, justifyContent: 'center' }}>
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
                                                            onPress={() => { this.postReview()}}>
                                    <Text style={{color: 'white',}}>Post</Text>
                                </TouchableOpacity>

                                <TouchableOpacity  style={{ backgroundColor: '#f2f2f2',height: 30, width: 80,borderRadius: 10, 
                                                            justifyContent: 'center', alignItems: 'center'}}
                                                    onPress={this.writeReviewForm}>
                                        <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>       
                    </Modal>

                </View>
                
                <View style={{height: 30, width: 30}}></View>
            </View>
        )
    }



    render(){


        return(
            <View style={{flex: 1}}>     
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.top_nav}
                                                onPress={() => this.props.navigation.goBack()}>
                                    
                                    <Image source={require('../image/left-arrow.png')}
                                    style={{width: 20, height: 20, tintColor: '#bff098'}}/>
                                    
                    </TouchableOpacity>

                        <View style={styles.top_nav2}>

                            <TouchableOpacity  style={{paddingHorizontal: 15}}//onPress={() => this.props.navigation.navigate("Setting")}
                                                        >
                                        <Image source={require('../image/love.png')}
                                                    style={{height: 20, 
                                                            width: 20, 
                                                            tintColor: 'red'}}></Image>
                            </TouchableOpacity>

                        </View>
                </View>

                <SafeAreaView style={styles.listContainer}>
                    {
                    this.state.isLoading ? <ActivityIndicator/>: (
                        <FlatList
                        
                            data={this.state.reviews}
                            renderItem = {this.renderItem}
                            keyExtractor={item => `key-${item.id}`} 
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            ListHeaderComponent={this.renderHeader}
                            ListFooterComponent={this.renderFooter}
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


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

    top_nav:{
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 10
    },
    top_nav2:{
        flex: 1,
        position: "absolute",
        right: 10,
        flexDirection: 'row',
        paddingTop: 10,
        //backgroundColor: 'green'
    },

    bookContainer:{
        alignItems: 'center',
        paddingTop: 10
    },

    bookImg:{
        height: 250,
        width: 250,
        //backgroundColor: '#748c94',
        borderRadius: 20
    },


    bookInfor:{
        alignSelf: 'center',
        width: "90%",
        //backgroundColor: 'white',
        borderRadius: 20
    },

    bookName:{
        //backgroundColor: 'green',
        paddingTop: 10,
        textAlign: 'center',
    },

    delete: {
        backgroundColor:'green',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    wrapText:{
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5
    },

    fontSize:{
        fontSize: 15,
        fontWeight: "200", 
    },

    item:{
        width: '90%',
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        marginBottom:10, 
        alignSelf: 'center',
        padding: 5
    },
    listContainer:{
        height: "90%",
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center', 
        borderRadius: 20
    },
    star:{
        height: 10, 
        width: 10
    },

    star2:{
        height: 15, 
        width: 15
    },

    unStar:{
        tintColor: '#748c94',
        height: 10, 
        width: 10
    },
    unStar2:{
        tintColor: '#748c94',
        height: 15, 
        width: 15
    },

    starContainer: {
        flexDirection: 'row',
        paddingBottom: 2,
    },


})