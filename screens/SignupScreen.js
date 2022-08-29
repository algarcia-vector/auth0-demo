import React, {useState} from 'react';
import {Alert} from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {createUser} from '../util/auth';
import {useNavigation} from '@react-navigation/native';

function SignupScreen() {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function signUpHandler({email, password}) {
    setIsAuthenticated(true);
    try {
      await createUser(email, password);
      Alert.alert(
        'Inscripción con exito.',
        'Por favor inicia sesion con tu nueva cuenta.',
        [{text: 'OK', onPress: () => navigation.navigate('Login')}],
      );
    } catch (error) {
      Alert.alert(
        'Fallo el proceso de inscribirse.',
        'Por favor verifica los datos ingresados.',
      );
      setIsAuthenticated(false);
    }
  }
  if (isAuthenticated) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
