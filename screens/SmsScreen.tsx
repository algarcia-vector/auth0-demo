import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {AuthContext} from '../store/auth-context';
import {SMS, SMSConfirm} from '../util/auth';

function SmsScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const mfaToken = authCtx.mfaToken;
    const fetchData = async () => {
      try {
        const OBBtoken = await SMS(mfaToken);
        console.log('OBBTOKEN', OBBtoken);
        authCtx.authenticateOBBToken(OBBtoken);
      } catch (error: any) {
        console.log('keonda', error);
      }
    };
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  async function SMSHandler({smsCode}: any) {
    setIsAuthenticated(true);
    try {
      const mfaToken = authCtx.mfaToken;
      const OBBToken = authCtx.obbToken;
      const token = await SMSConfirm(mfaToken, OBBToken, smsCode);
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
  return <AuthContent isSms onAuthenticate={SMSHandler} />;
}

export default SmsScreen;
