import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import images from 'constants/images';
import { ButtonRN } from 'components/ui/button';
import { TextRN } from 'components/ui/text';
import icons from '@/constants/icons';
import {login} from "@/lib/appwrite";
import { Alert } from 'react-native';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';

// import { Client, Account, ID } from 'react-native-appwrite';

//      const client = new Client()
//          .setProject('678a887e0025f747a2a3')
//          .setPlatform('com.ss.fintech');

// const client = new Client();
//  client.setProject('678a887e0025f747a2a3');

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    if(!loading && isLoggedIn) return <Redirect href="/" />

    const handleLogin = async() => {
        const result = await login();

        if(result) {
            refetch();
        } else {
            Alert.alert('Error', 'Failed to login');
        }
    };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.favicon} className="absolute w-[93px] h-[93px] top-[226px] left-[146px] p-[3.28px_10.37px]" resizeMode="contain" />
        <View className="px-10">
            <Text className="absolute w-[289px] h-[60px] top-[338px] left-[47px] font-bold font-inter-medium text-4xl text-center">Manifesting more {"\n"}money for you...
            </Text>
            <View>
                <ButtonRN onPress={handleLogin} variant="outline" className=" top-[679px] p-[12px_32px] flex-row-reverse items-center justify-center gap-2">
                    <TextRN>
                        Continue with Google
                    </TextRN>
                    <View className="flex flex-row items-center justify-center">
                        <Image
                            source={icons.google}
                            className="w-5 h-5"
                            resizeMode="contain"
                        />
                    </View>
                </ButtonRN>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn