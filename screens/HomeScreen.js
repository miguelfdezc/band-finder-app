import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import NavBar from '../components/NavBar';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/UI/Post';
import { getPostsFollowedAction } from '../store/actions';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);
  const posts = useSelector((state) => state.post.publicacionesSeguidos);

  useEffect(() => {
    dispatch(getPostsFollowedAction(authUser.uid));
  }, []);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <FlatList
        data={posts}
        renderItem={(item) => <Post data={item} />}
        contentContainerStyle={{ paddingBottom: 620 }}
      />
    </View>
  );
};

export default HomeScreen;

export const screenOptions = (navData) =>
  NavBar(navData, true, 'Add', 'add', Ionicons, () => {
    navData.navigation.navigate('CreatePost');
  });

const styles = StyleSheet.create({});
