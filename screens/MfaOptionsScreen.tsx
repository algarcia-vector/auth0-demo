import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from '../constants/styles';
import Button from '../components/ui/Button';
import {useNavigation} from '@react-navigation/native';

function MfaOptionsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.authContent}>
      <Text style={styles.title}>Selecciona el factor de autenticación</Text>
      <View style={styles.buttons}>
        <Button onPress={() => navigation.navigate('SMS')}>SMS</Button>
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => navigation.navigate('OTP')}>OTP</Button>
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => navigation.navigate('Push Notification')}>
          Push Notification
        </Button>
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => navigation.navigate('Email')}>Email</Button>
      </View>
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
  title: {
    color: Colors.primary100,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default MfaOptionsScreen;
