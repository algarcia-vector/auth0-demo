import React, {useState, useContext} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {Profile} from 'react-native-fbsdk-next';
import {AuthContext} from '../../store/auth-context';
import LoadingOverlay from '../ui/LoadingOverlay';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import {Colors} from '../../constants/styles';
import {faceBookAuthenticate, faceBookGetEmail} from '../../util/auth';

function AuthContent({isLogin, isOTP, isEmail, isSms, isPush, onAuthenticate}) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function getEmailfromFacebook(accessToken, id) {
    try {
      const email = await faceBookGetEmail(accessToken, id);
      console.log('email', email);
      return email;
    } catch (error) {
      console.log(error);
    }
  }
  const authCtx = useContext(AuthContext);

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate('Signup');
    } else {
      navigation.navigate('Login');
    }
  }

  function submitHandler(credentials) {
    let {email, password, confirmPassword, code, emailCode, smsCode} =
      credentials;
    if (isOTP) {
      onAuthenticate({code});
    } else if (isEmail) {
      onAuthenticate({emailCode});
    } else if (isSms) {
      onAuthenticate({smsCode});
    } else {
      // email = email.trim();
      // password = password.trim();

      // const emailIsValid = email.includes('@');
      // const passwordIsValid = password.length > 6;
      // const passwordsAreEqual = password === confirmPassword;

      // if (
      //   !emailIsValid ||
      //   !passwordIsValid ||
      //   (!isLogin && !passwordsAreEqual)
      // ) {
      //   Alert.alert('Invalid input', 'Please check your entered credentials.');
      //   setCredentialsInvalid({
      //     email: !emailIsValid,
      //     password: !passwordIsValid,
      //     confirmPassword: !passwordIsValid || !passwordsAreEqual,
      //   });
      //   return;
      // }
      onAuthenticate({email, password});
    }
  }

  if (isAuthenticated) {
    return <LoadingOverlay message="Loggin you in..." />;
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        isOTP={isOTP}
        isEmail={isEmail}
        isSms={isSms}
        isPush={isPush}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      {!isOTP && !isEmail && !isSms && !isPush && (
        <>
          <View
            style={{
              borderRadius: 6,
              paddingVertical: 6,
              paddingHorizontal: 12,
              elevation: 2,
              shadowColor: 'black',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              backgroundColor: '#1778F2',
              marginTop: 17,
            }}>
            <TouchableOpacity
              onPress={() => {
                LoginManager.logInWithPermissions(['public_profile']).then(
                  function (result) {
                    if (result.isCancelled) {
                      console.log('Login cancelled');
                    } else {
                      AccessToken.getCurrentAccessToken().then(data => {
                        setIsAuthenticated(true);
                        console.log(data.accessToken.toString());
                        Profile.getCurrentProfile().then(data2 => {
                          console.log(data2.name, 'id: ', data2.userID);
                          getEmailfromFacebook(
                            data.accessToken,
                            data2.userID,
                          ).then(data3 => {
                            faceBookAuthenticate(
                              data3.email,
                              data2.name,
                              data.accessToken.toString(),
                            )
                              .then(data4 => {
                                console.log('resultado final', data4);
                              })
                              .catch(error => {
                                if (
                                  error.response.data.error === 'mfa_required'
                                ) {
                                  console.log(error.response.data);
                                  const mfaToken =
                                    error.response.data.mfa_token;
                                  authCtx.authenticateMFAToken(mfaToken);
                                  navigation.navigate(
                                    'Segundo Factor de Autenticacion',
                                  );
                                } else {
                                  console.log(error);
                                  Alert.alert(
                                    'Fallo la autenticación',
                                    'No pudimos logearte. Por favor verifica tus credenciales!',
                                  );
                                  setIsAuthenticated(false);
                                }
                              });
                          });
                        });
                      });
                    }
                  },
                  function (error) {
                    console.log('Login fail with error: ' + error);
                  },
                );
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Log in with Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <FlatButton onPress={switchAuthModeHandler}>
              {isLogin ? 'Create a new user' : 'Log in instead'}
            </FlatButton>
          </View>
        </>
      )}
    </View>
  );
}

export default AuthContent;

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
    marginTop: 8,
  },
  facebookButton: {
    alignSelf: 'stretch',
  },
});
