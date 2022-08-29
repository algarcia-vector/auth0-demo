import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {AuthContext} from '../store/auth-context';
import {login} from '../util/auth';

function LoginScreen() {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginUpHandler({email, password}: any) {
    setIsAuthenticated(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error: any) {
      if (error.json.error === 'mfa_required') {
        console.log(error.json);
        const mfaToken = error.json.mfa_token;
        authCtx.authenticateMFAToken(mfaToken);
        navigation.navigate('Segundo Factor de Autenticacion');
      } else {
        console.log(error);
        Alert.alert(
          'Fallo la autenticación',
          'No pudimos logearte. Por favor verifica tus credenciales!',
        );
        setIsAuthenticated(false);
      }
    }
  }
  if (isAuthenticated) {
    return <LoadingOverlay message="Loggin you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginUpHandler} />;
}

export default LoginScreen;
