// import { Stack } from 'expo-router';
import { Slot } from 'expo-router';
import '../global.css';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://bd1163c9f8e4532e1b3d3e4175d10e19@o4510508539248640.ingest.us.sentry.io/4510508548816896',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  return (
    // <Stack>
    //   <Stack.Screen name="index" options={{ title: 'Home' }} />
    //   <Stack.Screen name="(example-code)/nav" options={{ title: 'Nav' }} />
    //   <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
    // </Stack>
    <Slot></Slot>
  );
});