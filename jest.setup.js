/* eslint-env jest */

jest.mock("expo-constants", () => ({
  __esModule: true,
  default: {
    expoConfig: { scheme: "exporn", slug: "reexpoapp" },
  },
}));

jest.mock("expo-linking", () => ({
  createURL: () => "exp://127.0.0.1/",
  getInitialURL: jest.fn(() => Promise.resolve(null)),
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
}));

jest.mock("@react-native-community/netinfo", () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn(() => jest.fn()),
    configure: jest.fn(),
    fetch: jest.fn(() =>
      Promise.resolve({
        type: "wifi",
        isConnected: true,
        isInternetReachable: true,
      }),
    ),
  },
}));

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");
  const Mock = ({ children, ...props }) => <View {...props}>{children}</View>;
  return {
    GestureHandlerRootView: Mock,
    PanGestureHandler: Mock,
    TapGestureHandler: Mock,
    State: {},
    ScrollView: View,
    NativeViewGestureHandler: Mock,
    gestureHandlerRootHOC: C => C,
    Directions: {},
  };
});

jest.mock("@gorhom/bottom-sheet", () => {
  return {
    BottomSheetModalProvider: ({ children }) => children,
    BottomSheetModal: () => null,
    BottomSheetBackdrop: () => null,
    BottomSheetView: ({ children }) => children,
    BottomSheetScrollView: ({ children }) => children,
  };
});

jest.mock("./src/navigation/RootNavigator", () => ({
  RootNavigator: () => null,
}));

jest.mock("@react-navigation/native", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    NavigationContainer: React.forwardRef(({ children }, ref) => (
      <View ref={ref}>{children}</View>
    )),
    DefaultTheme: { colors: {} },
    DarkTheme: { colors: {} },
    createNavigationContainerRef: () => ({
      current: { navigate: jest.fn(), reset: jest.fn(), goBack: jest.fn() },
    }),
  };
});

jest.mock("react-native-mmkv", () => ({
  createMMKV: () => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    remove: jest.fn(),
    clearAll: jest.fn(),
  }),
}));

jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US", languageCode: "en" }],
}));

jest.mock("@react-native-firebase/app", () => ({
  __esModule: true,
  default: jest.fn(() => ({ name: "[DEFAULT]" })),
}));

jest.mock("@react-native-firebase/remote-config", () => {
  const { REMOTE_CONFIG_DEFAULTS } = require("./src/remoteConfig/remoteConfigDefaults");

  return {
    getRemoteConfig: jest.fn(() => ({})),
    activate: jest.fn(() => Promise.resolve()),
    onConfigUpdate: jest.fn(() => jest.fn()),
    setConfigSettings: jest.fn(() => Promise.resolve()),
    setDefaults: jest.fn(() => Promise.resolve()),
    fetchAndActivate: jest.fn(() => Promise.resolve(true)),
    getValue: jest.fn((_rc, key) => {
      const value = REMOTE_CONFIG_DEFAULTS[key];
      return {
        asString: () => String(value ?? ""),
        asBoolean: () => Boolean(value),
        asNumber: () => Number(value ?? 0),
      };
    }),
    lastFetchStatus: jest.fn(() => "success"),
    fetchTimeMillis: jest.fn(() => Date.now()),
  };
});

jest.mock("@react-native-firebase/analytics", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    logEvent: jest.fn(() => Promise.resolve()),
    logScreenView: jest.fn(() => Promise.resolve()),
    setUserId: jest.fn(() => Promise.resolve()),
    setUserProperty: jest.fn(() => Promise.resolve()),
  })),
}));

jest.mock("@react-native-firebase/messaging", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getToken: jest.fn(() => Promise.resolve("mock-fcm-token")),
    onMessage: jest.fn(() => jest.fn()),
    onTokenRefresh: jest.fn(() => jest.fn()),
    onNotificationOpenedApp: jest.fn(() => jest.fn()),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    requestPermission: jest.fn(() => Promise.resolve(1)),
    setBackgroundMessageHandler: jest.fn(),
    hasPermission: jest.fn(() => Promise.resolve(true)),
  })),
}));

jest.mock("@react-native-firebase/crashlytics", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    log: jest.fn(),
    recordError: jest.fn(),
    crash: jest.fn(),
    setUserId: jest.fn(),
    setAttribute: jest.fn(),
    setAttributes: jest.fn(),
  })),
}));

jest.mock("@notifee/react-native", () => ({
  __esModule: true,
  default: {
    createChannel: jest.fn(() => Promise.resolve("default")),
    displayNotification: jest.fn(() => Promise.resolve("notification-id")),
    createTriggerNotification: jest.fn(() => Promise.resolve("notification-id")),
    onForegroundEvent: jest.fn(() => jest.fn()),
    onBackgroundEvent: jest.fn(() => jest.fn()),
    getNotificationSettings: jest.fn(() =>
      Promise.resolve({ authorizationStatus: 1 }),
    ),
    requestPermission: jest.fn(() =>
      Promise.resolve({ authorizationStatus: 1 }),
    ),
    cancelNotification: jest.fn(() => Promise.resolve()),
    cancelAllNotifications: jest.fn(() => Promise.resolve()),
    getTriggerNotificationIds: jest.fn(() => Promise.resolve([])),
  },
  AndroidImportance: {
    DEFAULT: 3,
    HIGH: 4,
    LOW: 2,
    MIN: 1,
  },
  AndroidNotificationSetting: { ENABLED: 1 },
  AuthorizationStatus: { AUTHORIZED: 1, DENIED: 0, NOT_DETERMINED: -1 },
  EventType: { PRESS: 1, DISMISSED: 2, ACTION_PRESS: 3 },
}));
