import Auth0 from 'react-native-auth0';
var axios = require('axios').default;

const auth0 = new Auth0({
  domain: 'dev-lpsnlof4.us.auth0.com',
  clientId: 'SOItRAtsHbbnNRBucwFwfTnN3UlEeaQz',
});

export async function createUser(email, password) {
  const response = await auth0.auth.createUser({
    email: email,
    password: password,
    connection: 'Azul',
  });
  return response;
}

export async function login(email, password) {
  const response = await auth0.auth.passwordRealm({
    username: email,
    password: password,
    realm: 'Azul',
    audience: 'https://dev-lpsnlof4.us.auth0.com/mfa/',
  });
  return response.accessToken;
}

export async function OTP(code, mfaToken) {
  const response = await auth0.auth.loginWithOTP({
    mfaToken: mfaToken,
    otp: code,
  });
  return response.accessToken;
}

export async function EMAIL(mfaToken) {
  var options = {
    method: 'POST',
    url: 'https://dev-lpsnlof4.us.auth0.com/mfa/challenge',
    data: {
      client_id: 'SOItRAtsHbbnNRBucwFwfTnN3UlEeaQz',
      client_secret:
        'PvnNmlzKA7MJ69T2tRhcSOGAq4Z-KchJ6ABTRkG8wr9aSVjlYqGkL-iRyYHS0SLu',
      challenge_type: 'oob',
      authenticator_id: 'email|dev_KdiBt1jXxdxkUkvS',
      mfa_token: mfaToken,
    },
  };
  const response = await axios.request(options);
  return response.data.oob_code;
}

export async function EMAILConfirm(mfaToken, OBBToken, emailCode) {
  var options = {
    method: 'POST',
    url: 'https://dev-lpsnlof4.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/json'},
    data: {
      grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
      client_id: 'SOItRAtsHbbnNRBucwFwfTnN3UlEeaQz',
      client_secret:
        'PvnNmlzKA7MJ69T2tRhcSOGAq4Z-KchJ6ABTRkG8wr9aSVjlYqGkL-iRyYHS0SLu',
      mfa_token: mfaToken,
      oob_code: OBBToken,
      binding_code: emailCode,
    },
  };
  const response = await axios.request(options);
  return response.data.access_token;
}

export async function SMS(mfaToken) {
  var options = {
    method: 'POST',
    url: 'https://dev-lpsnlof4.us.auth0.com/mfa/challenge',
    data: {
      client_id: 'SOItRAtsHbbnNRBucwFwfTnN3UlEeaQz',
      client_secret:
        'PvnNmlzKA7MJ69T2tRhcSOGAq4Z-KchJ6ABTRkG8wr9aSVjlYqGkL-iRyYHS0SLu',
      challenge_type: 'oob',
      authenticator_id: 'sms|dev_XUg1l25UMoUY2JUb',
      mfa_token: mfaToken,
    },
  };
  const response = await axios.request(options);
  return response.data.oob_code;
}

export async function SMSConfirm(mfaToken, OBBToken, smsCode) {
  var options = {
    method: 'POST',
    url: 'https://dev-lpsnlof4.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/json'},
    data: {
      grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
      client_id: 'SOItRAtsHbbnNRBucwFwfTnN3UlEeaQz',
      client_secret:
        'PvnNmlzKA7MJ69T2tRhcSOGAq4Z-KchJ6ABTRkG8wr9aSVjlYqGkL-iRyYHS0SLu',
      mfa_token: mfaToken,
      oob_code: OBBToken,
      binding_code: smsCode,
    },
  };
  const response = await axios.request(options);
  return response.data.access_token;
}

export async function resetPassword(email) {
  var options = {
    method: 'POST',
    url: 'https://dev-lpsnlof4.us.auth0.com/dbconnections/change_password',
    headers: {'content-type': 'application/json'},
    data: {
      client_id: 'SOItRAtsHbbnNRBucwFwfTnN3UlEeaQz',
      email: email,
      connection: 'Azul',
    },
  };
  const response = await axios.request(options);
  return response.data;
}

export async function faceBookAuthenticate(email, name, accesToken) {
  var options = {
    method: 'POST',
    url: 'https://dev-lpsnlof4.us.auth0.com/oauth/token',
    data: {
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      subject_token_type:
        'http://auth0.com/oauth/token-type/facebook-info-session-access-token',
      audience: 'https://dev-lpsnlof4.us.auth0.com/mfa/',
      scope: 'read:appointments openid profile email email_verified',
      subject_token: accesToken,
      client_id: 'SOItRAtsHbbnNRBucwFwfTnN3UlEeaQz',
      user_profile: {email: email, name: name},
    },
  };
  const response = await axios.request(options);
  return response.data;
}

export async function faceBookGetEmail(accessToken, id) {
  var options = {
    method: 'GET',
    url: `https://graph.facebook.com/${id}?fields=email&access_token=${accessToken}`,
  };
  const response = await axios.request(options);
  return response.data;
}
