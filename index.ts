import "react-native-gesture-handler";
import "./src/notifications/notificationSetup";
import "./src/crashLogger/crashLoggerSetup";

import { registerRootComponent } from "expo";

import App from "./App";

registerRootComponent(App);
