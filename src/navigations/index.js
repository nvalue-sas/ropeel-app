import * as React from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LoadingScreen from '@scenes/LoadingScreen';
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import {AuthContext} from '../context';
import FBSDK from 'react-native-fbsdk';
import {FB_LOGIN, FB_LOGOUT, USR_FIREBASE_TOKEN} from '../constants/RopeelAPI';
import AsyncStorage from '@react-native-community/async-storage';
import {  fcmService } from '../notifications/FCMService';
import {localNotificationService} from '../notifications/LocalNotificationService';

const {AccessToken, GraphRequest, GraphRequestManager, LoginManager} = FBSDK;

export default function RootNavigator() {
  const [isLoading, setIsloading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signInFacebook: async () => {
        setIsloading(true);
        await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
          //'user_friends',
          //'user_gender',
        ]).then(
          function (result) {
            if (result.isCancelled) {
              setIsloading(false);
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                let fbAccessToken = data.accessToken;
                let fbUserId = data.userID;
                const responseInfoCallback = (error, response) => {
                  if (error) {
                    setIsError(true);
                    setIsloading(false);
                    Alert.alert(
                      'Error FB-responseInfoCallback',
                      error.toString,
                      [{text: 'OK'}],
                      {
                        cancelable: false,
                      },
                    );
                    console.error(error);
                  } else {
                    let user = {
                      providerId: fbUserId,
                      token: fbAccessToken.toString(),
                      name: response.name,
                      email: response.email,
                      gender: 'P',
                      //picture: response.picture.data.url,
                    };
                    console.info(user);
                    fetch(FB_LOGIN, {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                      },
                      body: JSON.stringify(user),
                    })
                      .then((apiResponse) => apiResponse.json())
                      .then((apiData) => {
                        if (apiData.logType === 'success') {
                          setIsloading(false);
                          setUserId(apiData.usrId);
                          AsyncStorage.setItem('usrId', apiData.usrId);
                        } else {
                          Alert.alert(
                            'Error API-login',
                            apiData.logMessage,
                            [{text: 'OK'}],
                            {
                              cancelable: false,
                            },
                          );
                        }
                      })
                      .catch((errorFetch) => {
                        setIsError(true);
                        setIsloading(false);
                        Alert.alert(
                          'Error API-login_fetch',
                          errorFetch.toString,
                          [{text: 'OK'}],
                          {
                            cancelable: false,
                          },
                        );
                        console.log(errorFetch);
                      });
                  }
                };
                const infoRequest = new GraphRequest(
                  '/me',
                  {
                    accessToken: fbAccessToken,
                    parameters: {
                      fields: {string: 'name,email'}, //gender,picture
                    },
                  },
                  responseInfoCallback,
                );
                new GraphRequestManager().addRequest(infoRequest).start();
              });
            }
          },
          function (error) {
            setIsError(true);
            setIsloading(false);
            Alert.alert(
              'Error logInWithPermissions',
              error.toString(),
              [{text: 'OK'}],
              {
                cancelable: false,
              },
            );
            console.log(error);
          },
        );
      },
      signOutFacebook: async () => {
        setIsloading(true);
        const facebookLogout = () => {
          var current_access_token = '';
          AccessToken.getCurrentAccessToken()
            .then((data) => {
              current_access_token = data.accessToken.toString();
            })
            .then(() => {
              let logout = new GraphRequest(
                'me/permissions/',
                {
                  accessToken: current_access_token,
                  httpMethod: 'DELETE',
                },
                (error, result) => {
                  if (error) {
                    setIsError(true);
                    setIsloading(false);
                    console.error('Error fetching data: ' + error.toString());
                  } else {
                    LoginManager.logOut();
                  }
                },
              );
              new GraphRequestManager().addRequest(logout).start();
            })
            .catch((error) => {
              setIsloading(false);
              setIsError(true);
              console.log(error.toString());
            });
        };
        try {
          facebookLogout();
          if (isError || isError === false) {
            let usrStorageValue = await AsyncStorage.getItem('usrId');
            if (usrStorageValue !== null) {
              let currentUser = {
                user: usrStorageValue,
              };
              fetch(FB_LOGOUT, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-type': 'application/json',
                },
                body: JSON.stringify(currentUser),
              })
                .then((apiResponse) => apiResponse.json())
                .then((apiData) => {
                  if (apiData.logType === 'success') {
                    setIsloading(false);
                    setUserId(null);
                    AsyncStorage.clear();
                  }
                })
                .catch((errorFetch) => {
                  setIsError(true);
                  setIsloading(false);
                  console.log(errorFetch);
                });
            }
          }
        } catch (e) {
          setIsError(true);
          console.error(e);
        }
      },
      userLoggedIn: userId,
    };
  }, [userId, isError]);

  React.useEffect(() => {
    const getUserStorage = async () => {
      let usrStorageValue;
      try {
        usrStorageValue = await AsyncStorage.getItem('usrId');
        if (usrStorageValue !== null) {
          setUserId(usrStorageValue);
        }
      } catch (e) {
        setUserId(null);
        setIsloading(false);
        setIsError(true);
        Alert.alert(
          'Error',
          'React.useEffect => ' + e.toString,
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
        console.error(e);
      }
    };
    getUserStorage();
  }, []);

  React.useEffect(() => {
    const onRegister = (token) => {
      if (userId !== null) {
        fetch(USR_FIREBASE_TOKEN, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({user: userId, token: token}),
        })
          .then((apiResponse) => apiResponse.json())
          .then((apiData) => {
            if (apiData.logType !== 'success') {
              Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
                cancelable: false,
              });
              console.log(apiData);
            }
          })
          .catch((errorFetch) => {
            Alert.alert('Error', errorFetch.toString, [{text: 'OK'}], {
              cancelable: false,
            });
            console.log(errorFetch);
          });
      }
    };

    const onNotification = (notify) => {
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.notification.title,
        notify.notification.body,
        notify,
        options,
      );
    };

    const onOpenNotification = async (notify) => {
      console.log('notify', notify); 
    };

    //fcmService.requestUserPermission();
    console.info("OK!");
    fcmService.requestUserPermission(onRegister);
    console.info("OK!.1");
    fcmService.register(onRegister, onNotification, onOpenNotification);
    console.info("OK2");
    localNotificationService.configure(onOpenNotification);
    console.info("OK3");
  }, [userId]);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoading === true ? (
          <LoadingScreen />
        ) : userId == null ? (
          <AuthNavigator />
        ) : (
          <AppNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
