import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {AuthContext} from '../store/auth-context';
import {OTP} from '../util/auth';

function PushScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useContext(AuthContext);

  async function OTPHandler({code}: any) {
    setIsAuthenticated(true);
    try {
      const mfaToken = authCtx.mfaToken;
      const token = await OTP(code, mfaToken);
      authCtx.authenticate(token);
    } catch (error: any) {
      console.log('error en el otp:', error);
      Alert.alert(
        'Fallo la autenticación',
        'No pudimos logearte. Por favor verifica tus credenciales!',
      );
      setIsAuthenticated(false);
    }
  }
  if (isAuthenticated) {
    return <LoadingOverlay message="Loggin you in..." />;
  }
  return <AuthContent isPush onAuthenticate={OTPHandler} />;
}

export default PushScreen;
