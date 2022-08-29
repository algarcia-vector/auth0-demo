import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {Colors} from '../constants/styles';
import Button from '../components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {resetPassword} from '../util/auth';

function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function resetPasswordHandler() {
    setIsAuthenticated(true);
    try {
      await resetPassword(email);
      Alert.alert(
        'Correo enviado con exito!',
        'Por favor revisa tu correo electornico para generar una nueva contraseña.',
        [{text: 'OK', onPress: () => navigation.navigate('Login')}],
      );
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        'Fallo el proceso de restauración',
        'Verifica tu correo electronico.',
      );
      setIsAuthenticated(false);
    }
  }
  if (isAuthenticated) {
    return <LoadingOverlay message="Loggin you in..." />;
  }
  return (
    <View style={styles.authContent}>
      <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
      <Text style={styles.subTitle}>
        Ingresa tu correo electornico para restaurar tu contraseña.
      </Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType={'email-address'}
        onChangeText={setEmail}
        value={email}
        placeholder={'ejemplo@gmail.com'}
      />
      <Button onPress={resetPasswordHandler}>Reset Password</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginVertical: 8,
  },
  subTitle: {
    color: Colors.primary100,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 15,
  },
  title: {
    color: Colors.primary100,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
    marginBottom: 15,
  },
});

export default ResetPasswordScreen;
