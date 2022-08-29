import React, {useContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {AuthContext} from '../store/auth-context';
import {EMAIL, EMAILConfirm} from '../util/auth';

function EmailScreen() {
  const authCtx = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const mfaToken = authCtx.mfaToken;
    const fetchData = async () => {
      try {
        const OBBtoken = await EMAIL(mfaToken);
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

  async function EmailHandler({emailCode}: any) {
    setIsAuthenticated(true);
    try {
      const mfaToken = authCtx.mfaToken;
      const OBBToken = authCtx.obbToken;
      const token = await EMAILConfirm(mfaToken, OBBToken, emailCode);
      console.log(token);
      authCtx.authenticate(token);
    } catch (error: any) {
      console.log('error en el otp:', error.response);
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
  return <AuthContent isEmail onAuthenticate={EmailHandler} />;
}

export default EmailScreen;
