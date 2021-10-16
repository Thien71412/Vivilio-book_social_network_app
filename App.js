
import React, { useState } from "react";
import {ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Settings} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Route from "./screens/Route";
import Login from "./screens/Login";
import BooksDetail from "./screens/BooksDetail";
import PublishBook from "./screens/PublishBook";
import Profile from "./screens/Profile";
import Setting from "./screens/Setting";
import { useEffect } from "react/cjs/react.development";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "react-native-reanimated";
import User from "./screens/User";
import userEdit from "./screens/userEdit";
import CreateGroup from "./screens/CreateGroup";
import UserSearch from "./screens/UserSearch";
import BookSearch from "./screens/BookSearch";
import GroupSearch from "./screens/GroupSearch";
import updateReview from "./screens/updateReview";
import BookUpdate from "./screens/BookUpdate";
import userSearchDetail from "./screens/userSearchDetail";
import groupDetail from "./screens/groupDetail";
import postDetail from "./screens/postDetail";
import UpdatePost from "./screens/UpdatePost";
import updateComment from "./screens/updateComment";
import GroupLobby from "./screens/GroupLobby";
import GroupInfor from "./screens/GroupInfor";
import UpdateMember from "./screens/UpdateMember";




const Stack = createStackNavigator();

const App = () =>  {

  
  
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false }}>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Route" component={Route}></Stack.Screen>
        <Stack.Screen name="BooksDetail" component={BooksDetail}></Stack.Screen>
        <Stack.Screen name="PublishBook" component={PublishBook}></Stack.Screen>
        <Stack.Screen name="Setting" component={Setting}></Stack.Screen>
        <Stack.Screen name="User" component={User}></Stack.Screen>
        <Stack.Screen name="userEdit" component={userEdit}></Stack.Screen>
        <Stack.Screen name="CreateGroup" component={CreateGroup}></Stack.Screen>
        <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
        <Stack.Screen name="UserSearch" component={UserSearch}></Stack.Screen>
        <Stack.Screen name="BookSearch" component={BookSearch}></Stack.Screen>
        <Stack.Screen name="GroupSearch" component={GroupSearch}></Stack.Screen>
        <Stack.Screen name="updateReview" component={updateReview}></Stack.Screen>
        <Stack.Screen name="BookUpdate" component={BookUpdate}></Stack.Screen>
        <Stack.Screen name="userSearchDetail" component={userSearchDetail}></Stack.Screen>
        <Stack.Screen name="groupDetail" component={groupDetail}></Stack.Screen>
        <Stack.Screen name="postDetail" component={postDetail}></Stack.Screen>
        <Stack.Screen name="UpdatePost" component={UpdatePost}></Stack.Screen>
        <Stack.Screen name="updateComment" component={updateComment}></Stack.Screen>
        <Stack.Screen name="GroupLobby" component={GroupLobby}></Stack.Screen>
        <Stack.Screen name="GroupInfor" component={GroupInfor}></Stack.Screen>
        <Stack.Screen name="UpdateMember" component={UpdateMember}></Stack.Screen>
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}


export default App;
