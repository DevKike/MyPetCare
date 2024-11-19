import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MyPetCare',
  webDir: 'www',


  plugins: {
    LocalNotifications: {
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      showSpinner: true, 
      androidSpinnerStyle: 'horizontal',
      spinnerColor: '#999999',
    },
  },
};



export default config;
