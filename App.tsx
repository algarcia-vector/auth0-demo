import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OTPScreen from './screens/OTPScreen';
import EmailScreen from './screens/EmailScreen';
import SmsScreen from './screens/SmsScreen';
import PushScreen from './screens/PushScreen';
import MfaOptionsScreen from './screens/MfaOptionsScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {Colors} from './constants/styles';
import AuthContextProvider, {AuthContext} from './store/auth-context';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="SMS" component={SmsScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Push Notification" component={PushScreen} />
      <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
      <Stack.Screen
        name="Segundo Factor de Autenticacion"
        component={MfaOptionsScreen}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({tintColor}) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
};

export default App;
