import { View, Text, ScrollView, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "@/constants/icons"
import images from '~/constants/images';
import { ButtonRN } from '~/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Smile, SmileIcon } from 'lucide-react-native';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '~/components/ui/table';
import { TextRN } from '~/components/ui/text';
import {settings} from '@/constants/data';
import { useGlobalContext } from '~/lib/global-provider';
import { logout } from '~/lib/appwrite';
import { Alert as RNAlert } from 'react-native';


interface AddItemProps {
    icon: ImageSourcePropType;
    title: string;
    brand?: string;
    onPress?: () => void;
    textStyle?: string;
    price: number;
}

const AddItem = ({ icon, title, brand, onPress, textStyle, price }: AddItemProps) => (
    <ButtonRN 
        onPress={onPress}
        className="bg-white flex flex-row items-center justify-between py-3">
        <View className="flex flex-row items-center gap-2">
            <Image source={icon} className="w-[24px] h-[24px] mr-2"/>
            {/* ^^ eventually will replace with a dynmaic image of each item */}
            <View>
                <Text className=''>{brand}</Text>
                <View className="flex flex-row items-center gap-3">
                    <Text>{title}</Text>
                </View>
            </View>
            {/* ^^ this dynamic title will be the name of the product */}
        </View>
    </ButtonRN>
)


const Profile = () => {
    // getting user data to display on profile 
    const { user, refetch } = useGlobalContext();

    const handleLogout = async () => {
        const result = await logout();

        if(result) {
            RNAlert.alert("Success","You have been logged out successfully", );
            refetch();
        } else {
            RNAlert.alert("Error", "An Error occurred while logging out");
        }
    };
    
    // Example items
    const items: AddItemProps[] = [
        {
            icon: images.nike,
            title: 'Blazers',
            brand: 'Nike',
            price: 20, // Example price
        },
        {
            icon: icons.run,
            title: 'Item 2',
            brand:'hello',
            onPress: () => console.log('Item 2 pressed'),
            textStyle: 'text-gray-700',
            price: 24, // Example price
        },
    ];

    const AmountDiverted = ({ items }: {items: AddItemProps[] }) => {
        const showAlert = items.some((item) => item.price > 0);
        
        if (showAlert) {
            return (
                <Alert 
                    icon={SmileIcon} 
                    variant='default' 
                    className="w-[343px] h-[80px] absolute rounded-[8px]">
                    <AlertTitle className='text-[20px] leading-[24px]'>Keep it up!</AlertTitle>
                    <AlertDescription className='text-[16px] leading-[40px]'>You've diverted ${total.toFixed(2)} so far</AlertDescription>
                </Alert>
            );
        }
        return null;
    }
        {/* 
            ^^ this is creating logic for the alert of how much money has been diverted, if an item has a price then it will trigger an alert to appear at the top with how much money has been diverted
        */}

    // Calculate total price
    const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView 
           showsVerticalScrollIndicator= {false}
           contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
            <Text className="leading-none text-left font-inter-medium" style={{
                //width: 88, // Fixed width
                height: 24, // Fixed height
                top: 5, // Adjust top position
                left: 10, // Adjust left position
                fontFamily: 'Inter', // Ensure the font matches the specified style
                fontSize: 24, // Matches var(--typographybasesizes2xlargefont-size)
                fontWeight: '500', // Matches the medium weight
                lineHeight: 24, // Matches line-height: 24px
                textAlign: 'left', // Align text to the left
            }}>Hi, {user?.name}</Text>
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

            {/* Amount diverted alert */}
            <View className="flex-row justify-center flex mt-5">
                <AmountDiverted items={items}/>
            </View>

        <View className="flex-row justify-center flex">
            {/* Table of Items */}
            <View className="flex flex-col w-full px-4 mt-5">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            {/* Item column: Furthest left */}
                            <TableCell className="w-[156px] h-[48px] min-w-[85px] px-4">
                                <TextRN style={{
                                    top: 7, // Adjust top position
                                    right: 28, 
                                    fontSize: 14, 
                                    fontWeight: '500', 
                                    lineHeight: 20, 
                                    color: '#71717A',
                                }}>Item</TextRN>
                            </TableCell>
                            <TableCell className="text-right pr-4">
                                <TextRN className='justify-items-end'
                                style={{
                                    top: 7, // Adjust top position
                                    left: 100, 
                                    fontSize: 14, 
                                    fontWeight: '500', 
                                    lineHeight: 20, 
                                    color: '#71717A',
                                }}>Amount</TextRN>
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="flex flex-row items-center">
                                        <Image source={item.icon} className="w-[58px] h-[58px] mr-4" />
                                    <View>
                                        <TextRN
                                        style={{
                                            fontSize: 12, 
                                            fontWeight: '400', 
                                            lineHeight: 12, 
                                        }}>{item.brand}</TextRN>
                                        <TextRN
                                        style={{
                                            fontSize: 16, 
                                            fontWeight: '500', 
                                            lineHeight: 24,
                                        }}>{item.title}</TextRN>
                                    </View>
                                    </TableCell>
                                    <TableCell className="justify-center">
                                        <TextRN className="text-right"
                                        style={{
                                            fontSize: 14, 
                                            fontWeight: '400', 
                                            lineHeight: 20, 
                                            textAlign: 'right',
                                            width: 180
                                        }}>${item.price.toFixed(2)}
                                        </TextRN>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>
                                <TextRN
                                style={{
                                    top: 7, // Adjust top position
                                    right: 28, 
                                    fontSize: 14, 
                                    fontWeight: '500', 
                                    lineHeight: 20, 
                                    color: '#18181B',
                                }}>Total</TextRN>
                            </TableCell>
                            <TableCell>
                                <TextRN
                                style={{
                                    fontSize: 15, 
                                    fontWeight: '500', 
                                    lineHeight: 20,
                                    textAlign:'right',
                                    width: 260
                                }}>${total.toFixed(2)}</TextRN>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </View>
        </View>
        {/* 
            ^^ this controls the table view  
        */}
        {/* 
            
        <View className="flex flex-col mt-10 items-start right-4">
            <AddItem 
                icon={icons.add} 
                brand='Nike'
                title="Blazers" 
                price={300}
            />
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary">
            {settings.slice(2).map((item, index) => (
                <AddItem key={index} {... item} />
            ))}
        </View>
        */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary">
            <ButtonRN onPress={handleLogout} className="bg-white flex flex-row items-center justify-between py-3 px-4 rounded-md">
                <View>
                    <Image source={icons.logout} className="w-[24px] h-[24px] mr-2"/>
                    <View>
                        <TextRN className="text-black">
                            Logout
                        </TextRN>
                    </View>
                </View>

            </ButtonRN>
            {/* 
                ^^ logout button
                <AddItem icon={icons.logout} title="Logout" onPress={handleLogout}/>
            */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile