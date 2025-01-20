import "../global.css";
import { SplashScreen, Stack } from "expo-router";

import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ 
    "Inter-Italic": require('../assets/fonts/static/Inter-Italic.ttf'),
    "Inter-Regular": require('../assets/fonts/static/Inter-Regular.ttf'),
    "Inter-Medium": require('../assets/fonts/static/Inter-Medium.ttf'),
    "Inter-MediumItalic": require('../assets/fonts/static/Inter-MediumItalic.ttf'),
    "Inter-SemiBold": require('../assets/fonts/static/Inter-SemiBold.ttf'),
    "Inter-SemiBoldItalic": require('../assets/fonts/static/Inter-SemiBoldItalic.ttf'),
    "SpaceMono-Regular": require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(()=> {
    if (fontsLoaded)
    {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) return null;


  return (
    <GlobalProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </GlobalProvider>
  );
}