import React, { useRef, useState, useEffect, memo } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Tabs from './components/Tabs';
import AddLogModal from './components/AddLogModal';
import MoreModal from './components/MoreModal';
import ThreeDotsWhite from '../../assets/icons/ThreeDots.png';
import { useSelector } from 'react-redux';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const AVATARS = [
    require('../../assets/avatars/1.png'),
    require('../../assets/avatars/2.png'),
    require('../../assets/avatars/3.png'),
    require('../../assets/avatars/4.png'),
    require('../../assets/avatars/5.png'),
];

const Home = () => {
    let addModalRef = useRef(null);
    let moreModalRef = useRef(null);

    const navigation = useNavigation();

    const name = useSelector(state => state.user.name);
    const avatar = useSelector(state => state.user.avatar);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#6c5ce7',
                elevation: 0,
            },
            headerTitleStyle: {
                fontFamily: 'Lato-Bold',
                color: '#f4f4f4'
            },
            headerRight: () => {
                return (
                    <TouchableOpacity activeOpacity={0.8} style={styles.more_button} onPress={openMoreModal}>
                        <Image source={ThreeDotsWhite} style={{ width: 5, height: 17 }} resizeMode="contain" />
                    </TouchableOpacity>
                );
            }
        });
    }, []);

    const setAddModalRef = (ref) => addModalRef = ref;
    const setMoreModalRef = (ref) => moreModalRef = ref;

    const openAddLogModal = () => {
        addModalRef.open();
    }

    const closeAddLogModal = () => {
        addModalRef.close();
    }

    const openMoreModal = () => {
        moreModalRef.open();
    }

    const closeMoreModal = () => {
        moreModalRef.close();
    }

    return (
        <>
            <View style={styles.screen}>
                <View style={styles.home_header}>
                    <View style={styles.header_greeting}>
                        <Image source={AVATARS[avatar - 1]} style={styles.profile_image} />
                        <View style={styles.welcome_text}>
                            <Text style={styles.name_text}>Hi, {name}</Text>
                            <Text style={styles.greeting_text}>You have 15 tasks pending</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.home_body}>
                    <Tabs openModel={openAddLogModal} />
                </View>
            </View>
            <AddLogModal setRef={setAddModalRef} close={closeAddLogModal} />
            <MoreModal setRef={setMoreModalRef} close={closeMoreModal} />
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: '#F4F4F4',
    },
    home_header: {
        width: WIDTH,
        backgroundColor: '#6c5ce7',
        paddingHorizontal: 12,
        paddingVertical: 28
    },
    home_body: {
        width: WIDTH,
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    profile_image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 12
    },
    welcome_text: {
        alignItems: 'center'
    },
    name_text: {
        color: '#F4F4F4',
        fontFamily: 'Lato-Black',
        fontSize: 22,
        marginBottom: 6
    },
    greeting_text: {
        color: '#dfe6e9',
        fontFamily: 'Lato-Regular',
        fontSize: 16
    },
    header_greeting: {
        flexDirection: 'column',
        alignItems: 'center',
        // marginTop: 18
    },
    screen_name: {
        color: '#f4f4f4',
        fontFamily: 'Lato-Bold',
        fontSize: 17
    },
    navbar: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6c5ce7'
    },
    more_button: {
        marginRight: 22,
        height: '70%',
        width: 30,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
});

export default memo(Home);

