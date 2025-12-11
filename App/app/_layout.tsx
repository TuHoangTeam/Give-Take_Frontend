// import { Stack } from 'expo-router';
import { Slot } from "expo-router";
import "../global.css";
import * as Sentry from "@sentry/react-native";
import { Button, Pressable, Text, View } from "react-native";
import { useNavigationContainerRef } from "expo-router";
import { useEffect } from "react";

const navigationIntegration = Sentry.reactNavigationIntegration();

Sentry.init({
  dsn: "https://5e4c0b9bd2cd50853619dcb58bf4833c@o4510508539248640.ingest.us.sentry.io/4510511642181632",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  tracePropagationTargets: ["https://myproject.org", /^\/api\//],
  debug: true, // Bật để xem logs khi test

  // Enable Logs
  enableLogs: true,

  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% transactions khi test
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 5000,

  // User Interaction Tracking
  enableUserInteractionTracing: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  maxBreadcrumbs: 150,

  enableNative: true,
  enableNativeCrashHandling: true,
  enableAutoPerformanceTracing: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);
  // Thiết lập user context cho analytics

  useEffect(() => {
    Sentry.setUser({
      id: "tu-hoang-test",
      email: "tuhoang@gmail.com",
      username: "Tu Hoàng",
    });
    Sentry.setTag("group", "tu-hoang");
  }, []);

  return (
    // <Stack>
    //   <Stack.Screen name="index" options={{ title: 'Home' }} />
    //   <Stack.Screen name="(example-code)/nav" options={{ title: 'Nav' }} />
    //   <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
    // </Stack>
    <View style={{ flex: 1 }}>
      <Button
        title="Try!"
        onPress={() => {
          Sentry.captureException(new Error("First error"));
        }}
      />
      <Button
        title="Test Sentry"
        onPress={() => {
          console.log(
            "=== TEST SENTRY: Crash tại nút + Đăng sách/tài liệu mới ==="
          );
          // Gửi message
          Sentry.captureMessage(
            "Test Sentry từ nút + Đăng sách/tài liệu mới – Nhóm 4 test crash"
          );
          // Gửi exception
          Sentry.captureException(
            new Error(
              "SENTRY ERROR: Crash test – nút + Đăng sách/tài liệu mới (error + sourcemaps + performance)"
            )
          );
          // Crash thật
          throw new Error(
            "CRASHED: Crash test từ màn hình Đăng Sách/Tài Liệu – Sentry test"
          );
        }}
      />
      <Slot></Slot>
    </View>
  );
});
