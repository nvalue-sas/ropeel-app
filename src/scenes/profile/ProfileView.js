import * as React from 'react';
import {Alert, ScrollView, View, TouchableOpacity} from 'react-native';
import {
  AirbnbRating,
  Avatar,
  Image,
  Input,
  Overlay,
} from 'react-native-elements';
import {AuthContext} from '../../context';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Modal from 'react-native-modal';
import {
  USR_AVATAR,
  USR_AVATAR_DEFAULT,
  USR_NICKNAME,
  USR_INFO,
  IMAGES_APP,
  FEEDBACK_TYPES,
  SAVE_FEEDBACK,
} from '../../constants/RopeelAPI';
import {Picker} from '@react-native-community/picker';
import UserVehicles from '../user_vehicles/UserVehicles';
import ImagePicker from 'react-native-image-picker';
import GenericText from '../../componets/atoms/GenericText';
import IconAnt from 'react-native-vector-icons/AntDesign';
import GenericButton from '../../componets/atoms/GenericButton';
import {Colors} from '@styles/index';
import styles from '@styles/views/profile';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {set} from 'react-native-reanimated';

export default function ProfileView({navigation}) {
  const {signOutFacebook, userLoggedIn} = React.useContext(AuthContext);
  const [userAvatar, setUserAvatar] = React.useState(null);
  const [isVisibleAvatarModal, setIsVisibleAvatarModal] = React.useState(false);
  const [avatares, setAvatares] = React.useState([]);
  const [avatarSelect, setAvatarSelect] = React.useState({id: 0});
  const [userNickname, setUserNickname] = React.useState(null);
  const [reload, setReload] = React.useState(false);
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const [nicknameNewValue, setNicknameNewValue] = React.useState(null);
  const [feedbackModal, setFeedbackModal] = React.useState(false);
  const [feedbackTypes, setFeedbackTypes] = React.useState([]);
  const [fbType, setFbType] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    hideMenu();
  };

  const menu = React.useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

  React.useEffect(() => {
    fetch(USR_INFO, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({user: userLoggedIn}),
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          setUserAvatar(apiData.avatar);
          setUserNickname(apiData.nickname);
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((errorFetch) => {
        console.error(errorFetch);
      });
  }, [userLoggedIn, reload]);

  const selectAvatarImage = async () => {
    const imgPickerOptions = {
      title: 'Seleccione una foto',
      takePhotoButtonTitle: 'Tomar una foto',
      chooseFromLibraryButtonTitle: 'Elegir de la galeria',
      cancelButtonTitle: 'Cancelar',
      noData: false,
      mediaType: 'photo',
    };
    ImagePicker.showImagePicker(imgPickerOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const imgInfo = {
          user: userLoggedIn,
          fileName: response.fileName,
          fileSize: response.fileSize,
          mimeType: response.type,
          content: response.data,
        };
        JSON.stringify(imgInfo);
        fetch(USR_AVATAR, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(imgInfo),
        })
          .then((apiResponse) => apiResponse.json())
          .then((apiData) => {
            if (apiData.logType === 'success') {
              setReload(!reload);
            } else {
              Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
                cancelable: false,
              });
            }
          })
          .catch((errorFetch) => {
            console.error(errorFetch);
          });
      }
    });
    hideMenu();
  };

  const changeNickname = async () => {
    try {
      if (nicknameNewValue === null || !nicknameNewValue.trim()) {
        Alert.alert(
          'Error',
          'El nuevo nickname no puede ser nulo o vacio',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      } else {
        const userRequest = {
          user: userLoggedIn,
          nickName: nicknameNewValue,
        };
        fetch(USR_NICKNAME, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(userRequest),
        })
          .then((apiResponse) => apiResponse.json())
          .then((apiData) => {
            console.log(apiData);
            if (apiData.logType === 'success') {
              setReload(!reload);
            } else {
              Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
                cancelable: false,
              });
            }
          })
          .catch((errorFetch) => {
            console.error(errorFetch);
          });
        toggleOverlay();
      }
    } catch (e) {
      console.error(e);
    }
  };

  function createVehicle() {
    navigation.navigate('Vehicle', {
      screen: 'VehicleTypes',
      params: {
        vehicleInfo: {
          nvgUser: userLoggedIn,
          nvgVehicleHist: null,
          nvgTypeCode: null,
          nvgSubtypeCode: null,
          nvgSubtypeIcon: null,
          nvgColor: null,
          nvgPlate: null,
          nvgBrandCode: null,
          nvgReferenceId: null,
          nvgModel: null,
        },
      },
    });
  }

  const AvatarLoader = () => (
    <ContentLoader
      width={150}
      height={150}
      backgroundColor="#eaeced"
      foregroundColor="#f5f5f5"
      style={styles.avatar}>
      <Circle cx="75" cy="75" r="75" />
    </ContentLoader>
  );

  const NickNameLoader = () => (
    <ContentLoader
      height={60}
      backgroundColor="#eaeced"
      foregroundColor="#f5f5f5">
      <Rect x="80" y="20" rx="4" ry="4" width="250" height="19" />
      <Rect x="150" y="44" rx="4" ry="4" width="120" height="16" />
    </ContentLoader>
  );

  function getAvataresImages() {
    fetch(IMAGES_APP, {
      method: 'GET',
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          setAvatares(apiData.avatars);
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((errorFetch) => {
        console.error(errorFetch);
      });
  }

  function showAvataresModal() {
    getAvataresImages();
    setIsVisibleAvatarModal(true);
    hideMenu();
  }

  const updateAvatarImage = async () => {
    fetch(USR_AVATAR_DEFAULT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({user: userLoggedIn, file: avatarSelect.id}),
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          setReload(!reload);
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((errorFetch) => {
        console.error(errorFetch);
      });
    setAvatarSelect({id: 0});
    setIsVisibleAvatarModal(false);
  };

  function getFeedbackTypes() {
    fetch(FEEDBACK_TYPES, {
      method: 'GET',
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          setFeedbackTypes(apiData.feedbackTypes);
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((errorFetch) => {
        console.error(errorFetch);
      });
  }

  function showFeedBackModal() {
    getFeedbackTypes();
    setFeedbackModal(true);
  }

  function changeFeedbackType(code) {
    setFbType(code);
  }

  const saveFeedback = async () => {
    if (feedback === null || !feedback.trim()) {
      Alert.alert(
        'Error',
        'El comentario no puede estar vacio',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    } else {
      fetch(SAVE_FEEDBACK, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          type: fbType,
          feedback: feedback,
          user: userLoggedIn,
        }),
      })
        .then((apiResponse) => apiResponse.json())
        .then((apiData) => {
          if (apiData.logType === 'success') {
            setReload(!reload);
            Alert.alert('Exitoso', apiData.logMessage, [{text: 'OK'}], {
              cancelable: false,
            });
          } else {
            Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
              cancelable: false,
            });
          }
        })
        .catch((errorFetch) => {
          console.error(errorFetch);
        });
      setFeedback(null);
      setFeedbackModal(false);
      hideMenu();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.menuContainer}>
        <Menu
          ref={menu}
          button={
            <IconAnt
              name="setting"
              size={24}
              onPress={showMenu}
              color={Colors.TEXT}
            />
          }>
          <MenuItem
            onPress={() => showAvataresModal()}
            textStyle={styles.menuText}>
            Cambiar avatar
          </MenuItem>
          <MenuItem onPress={() => toggleOverlay()} textStyle={styles.menuText}>
            Modificar Alias
          </MenuItem>
          <MenuItem
            onPress={() => showFeedBackModal()}
            textStyle={styles.menuText}>
            Enviar comentarios
          </MenuItem>
          <MenuItem
            onPress={() => signOutFacebook()}
            textStyle={styles.menuText}>
            Cerrar sesión
          </MenuItem>
          <MenuDivider />
          <MenuItem textStyle={[styles.menuText, styles.version]}>
            Ropeel V. 0.0.4
          </MenuItem>
        </Menu>
      </View>
      {userAvatar ? (
        <Avatar
          source={{
            uri: userAvatar,
          }}
          size="xlarge"
          containerStyle={styles.avatar}
          rounded
        />
      ) : (
        <AvatarLoader />
      )}
      {userNickname ? (
        <View style={styles.userBody}>
          <GenericText type="h3" text={userNickname} />
          <AirbnbRating
            selectedColor={Colors.PRIMARY}
            showRating={false}
            size={13}
            isDisabled={true}
          />
        </View>
      ) : (
        <NickNameLoader />
      )}
      <View style={styles.options}>
        <UserVehicles user={userLoggedIn} navigation={navigation} />
        <GenericButton
          type="primary"
          title="CREAR VEHICULO"
          onPress={() => createVehicle()}
          style={styles.btnCreateVehicle}
        />
      </View>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}>
        <View style={styles.overlayContainer}>
          <Image
            source={require('@assets/images/edit.png')}
            style={styles.overlayImage}
          />
          <GenericText
            type="h5"
            text="Queremos mantener a todos los usuarios de la comunidad Ropeel
              seguros, por ese motivo te sugerimos que, al asignar un nuevo alias
              o apodo (nickname), no uses tú información personal."
            style={styles.overlaySuggest}
          />
          <Input
            inputContainerStyle={styles.overlayInputContainer}
            inputStyle={styles.overlayInput}
            placeholder="Nuevo nickname"
            onChangeText={(value) => setNicknameNewValue(value)}
            type="username"
          />
          <GenericButton
            type="primary"
            title="Guardar"
            onPress={() => changeNickname()}
          />
        </View>
      </Overlay>
      <Modal style={styles.avatarModal} isVisible={isVisibleAvatarModal}>
        <View style={styles.avatarModalContainer}>
          <View style={styles.avatarModalTitle}>
            <IconAnt
              name="close"
              size={24}
              onPress={() => setIsVisibleAvatarModal(false)}
              color={Colors.TEXT}
            />
            <GenericText
              type="h4"
              text="Modificar Avatar"
              style={styles.avatarModalTitleText}
            />
          </View>
          <ScrollView>
            <View style={styles.avatarModalImages}>
              <View style={styles.avatarModalImagesBody}>
                {avatares.map((l, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.avatarImage,
                      avatarSelect.id === l.id ? styles.avatarSelect : null,
                    ]}
                    onPress={() => setAvatarSelect(l)}>
                    <Image
                      source={{uri: l.image}}
                      style={
                        avatarSelect.id === l.id
                          ? styles.avatarImgSelect
                          : styles.avatarImgSize
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <GenericButton
            type="primary"
            title="Guardar"
            onPress={() => updateAvatarImage()}
            style={styles.btnSaveAvatar}
          />
        </View>
      </Modal>
      <Modal style={styles.avatarModal} isVisible={feedbackModal}>
        <View style={styles.avatarModalContainer}>
          <View style={styles.avatarModalTitle}>
            <IconAnt
              name="close"
              size={24}
              onPress={() => setFeedbackModal(false)}
              color={Colors.TEXT}
            />
            <GenericText
              type="h4"
              text="Enviar comentarios"
              style={styles.avatarModalTitleText}
            />
          </View>
          <ScrollView>
            <View style={styles.feedbackContainer}>
              <View style={styles.feedbackBody}>
                <GenericText
                  type="p"
                  text="Esta es una version BETA de la aplicacion ROPEEL, con tu ayuda podremos mejorar enormemente la aplicacion y convertirla en una comunidad segura y efeciente para todos."
                  style={styles.feedbackText}
                />
                <Picker
                  selectedValue={fbType}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    changeFeedbackType(itemValue)
                  }>
                  {feedbackTypes.map((l, i) => (
                    <Picker.Item key={i} label={l.name} value={l.code} />
                  ))}
                </Picker>
                <Input
                  placeholder="Envia aqui tus comentarios..."
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(value) => setFeedback(value)}
                />
              </View>
            </View>
          </ScrollView>
          <GenericButton
            type="primary"
            title="Enviar"
            onPress={() => saveFeedback()}
            style={styles.btnSaveFeedback}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}
