import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Button from '../ui/Button';
import Input from './Input';
import {Colors} from '../../constants/styles';

function AuthForm({
  isLogin,
  isOTP,
  isEmail,
  isSms,
  isPush,
  onSubmit,
  credentialsInvalid,
}) {
  const navigation = useNavigation();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [enteredEmailOTP, setEnteredEmailOTP] = useState('');
  const [enteredSmsOtp, setEnteredSmsOTP] = useState('');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
      case 'otp':
        setEnteredOTP(enteredValue);
        break;
      case 'emailOtp':
        setEnteredEmailOTP(enteredValue);
        break;
      case 'smsOtp':
        setEnteredSmsOTP(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      code: enteredOTP,
      emailCode: enteredEmailOTP,
      smsCode: enteredSmsOtp,
    });
  }

  return (
    <>
      {!isOTP && !isEmail && !isSms && !isPush && (
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
      )}
      {!isOTP && !isEmail && !isSms && !isPush && (
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
      )}
      {isLogin && (
        <View style={{alignItems: 'flex-end', marginVertical: 3}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Reset Password')}>
            <Text style={{color: Colors.primary100}}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      )}
      {!isLogin && !isOTP && !isEmail && !isSms && !isPush && (
        <Input
          label="Confirm Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'confirmPassword')}
          secure
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        />
      )}
      {isOTP && (
        <Input
          label="Confirm OTP"
          onUpdateValue={updateInputValueHandler.bind(this, 'otp')}
          value={enteredOTP}
        />
      )}
      {isEmail && (
        <Input
          label="Confirm Email Code"
          onUpdateValue={updateInputValueHandler.bind(this, 'emailOtp')}
          value={enteredEmailOTP}
        />
      )}
      {isSms && (
        <Input
          label="Confirm Sms Code"
          onUpdateValue={updateInputValueHandler.bind(this, 'smsOtp')}
          value={enteredSmsOtp}
        />
      )}
      <View style={isPush ? null : styles.buttons}>
        <Button onPress={submitHandler}>
          {isLogin
            ? 'Log In'
            : isOTP
            ? 'Enter OTP'
            : isEmail
            ? 'Enter email code'
            : isSms
            ? 'Enter sms code'
            : isPush
            ? 'Send Push Notification'
            : 'Sign Up'}
        </Button>
      </View>
    </>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
