import { View, Text, ScrollView, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "@/constants/icons"
import images from '~/constants/images';
import { ButtonRN } from '~/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Smile, SmileIcon } from 'lucide-react-native';


interface AddItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress: () => void;
    textStyle?: string;
    price: number;
}

const AddItem = ({ icon, title, onPress, textStyle, price }: AddItemProps) => (
    <ButtonRN>
        <View>
            <Image source={icon} className="w-[24px] h-[24px] mr-2"/>
            {/* ^^ eventually will replace with a dynmaic image of each item */}
            <Text>{title}</Text>
            {/* ^^ this dynamic title will be the name of the product */}
        </View>
    </ButtonRN>
)

const AmountDiverted = ({ items }: {items: AddItemProps[] }) => {
    const showAlert = items.some((item) => item.price > 0);
    
    if (showAlert) {
        return (
            <Alert 
                icon={SmileIcon} 
                variant='default' 
                className="w-[343px] h-[80px] absolute rounded-[8px]">
                <AlertTitle className='text-[20px] leading-[24px]'>Keep it up!</AlertTitle>
                <AlertDescription className='text-[16px] leading-[40px]'>You've diverted $15,051 so far</AlertDescription>
            </Alert>
        );
    }
    return null;
}
    {/* 
        ^^ this is creating logic for the alert of how much money has been diverted, if an item has a price then it will trigger an alert to appear at the top with how much money has been diverted
    */}

const Profile = () => {
    const handleLogout = async () => {};

    // Example items
    const items: AddItemProps[] = [
        {
            icon: icons.smile,
            title: 'Item 1',
            onPress: () => console.log('Item 1 pressed'),
            textStyle: 'font-bold text-blue-500',
            price: 20, // Example price
        },
        {
            icon: icons.smile,
            title: 'Item 2',
            onPress: () => console.log('Item 2 pressed'),
            textStyle: 'text-gray-700',
            price: 0, // Example price
        },
    ];

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView 
           showsVerticalScrollIndicator= {false}
           contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
            <Text className="leading-none text-left font-inter-medium" style={{
                width: 88, // Fixed width
                height: 24, // Fixed height
                top: 5, // Adjust top position
                left: 12, // Adjust left position
                fontFamily: 'Inter', // Ensure the font matches the specified style
                fontSize: 24, // Matches var(--typographybasesizes2xlargefont-size)
                fontWeight: '500', // Matches the medium weight
                lineHeight: 24, // Matches line-height: 24px
                textAlign: 'left', // Align text to the left

            }}>Hi, Lora</Text>
            <ButtonRN
                variant="secondary"
                className="w-[40px] h-[40px] p-[8px_16px] justify-center items-center gap-2 flex-shrink-0 rounded-xl"
            >
                <Image 
                    source={icons.add}
                     className="w-[16px] h-[16px] flex-shrink-0"
                    />
            </ButtonRN>
        </View>
        {/* 
            ^^ creates the row for where it says hi,lora (on the left)then the add item button (on the right)
        */}

        <View className="flex-row justify-center flex mt-5">
            {/* 
            <Alert icon={icons.smile} variant="default">

            </Alert>
            */}
            <AmountDiverted items={items}/>

            <View className="flex flex-col items-center relative mt-5">
                {/* <Image source={images.icon} className="size-44 relative rounded-full"/>
                <Text className="text-2xl font-inter-semibold mt-2">Lora</Text>
                */}
            </View>
        </View>
        {/* 
            ^^ this is where the running man icon and name is in the middle top of the page 
        */}

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile