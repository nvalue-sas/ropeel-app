import * as React from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import {SAVE_TRACKING} from '../../constants/RopeelAPI';
import IconAnt from 'react-native-vector-icons/AntDesign';
import GenericButton from '../../componets/atoms/GenericButton';
import {Input} from 'react-native-elements';
import {Colors} from '@styles/index';

export default function UserTrackView({route, navigation}) {
  const params = route.params;
  const [imageSelect, setImageSelect] = React.useState({uri: null});
  const [comment, setCommet] = React.useState(null);

  const selectCaseImage = async () => {
    const imgPickerOptions = {
      title: 'Opciones',
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
        setImageSelect({
          fileName: response.fileName,
          fileSize: response.fileSize,
          mimeType: response.type,
          content: response.data,
          uri: 'data:'
            .concat(response.type)
            .concat(';base64,')
            .concat(response.data),
        });
      }
    });
  };

  function reportarSeguimiento() {
    if (imageSelect.uri === null) {
      Alert.alert(
        'Precaución',
        'Carga una imagen de lo que has visto',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    } else if (comment === null) {
      Alert.alert(
        'Precaución',
        'Escribe un breve comentario de lo que has visto',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    } else {
      fetch(SAVE_TRACKING, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          user: params.user,
          case: params.id,
          comment: comment,
          fileName: imageSelect.fileName,
          fileSize: imageSelect.fileSize,
          mimeType: imageSelect.mimeType,
          content: imageSelect.content,
          lat: params.location.latitude,
          long: params.location.longitude,
        }),
      })
        .then((apiResponse) => apiResponse.json())
        .then((apiData) => {
          if (apiData.logType === 'success') {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          } else {
            Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
              cancelable: false,
            });
          }
        })
        .catch((errorFetch) => {
          Alert.alert('Error', errorFetch.toString(), [{text: 'OK'}], {
            cancelable: false,
          });
          console.error(errorFetch);
        });
    }
  }

  const selectCaseVideo = async () => {
    const videoPickerOptions = {
      title: 'Seleccione una video',
      takePhotoButtonTitle: 'Grabar',
      chooseFromLibraryButtonTitle: 'Elegir de la galeria',
      cancelButtonTitle: 'Cancelar',
      mediaType: 'video',
      quality: 1,
    };
    ImagePicker.showImagePicker(videoPickerOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('VideoPicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
      }
    });
  };

  return (
    <View style={styles.container}>
      {imageSelect.uri !== null ? (
        <View style={styles.imageContainer}>
          <IconAnt
            name="closecircleo"
            size={24}
            color={Colors.PRIMARY}
            style={styles.iconRemove}
            onPress={() => setImageSelect({uri: null})}
          />
          <Image
            source={{uri: imageSelect.uri}}
            style={imageSelect.uri !== null ? styles.imagePreview : null}
          />
        </View>
      ) : (
        <View />
      )}
      <Input
        placeholder="Cuentanos lo que has visto..."
        multiline={true}
        numberOfLines={4}
        onChangeText={(value) => setCommet(value)}
      />
      <View style={styles.iconsContainer}>
        <IconAnt
          name="camerao"
          size={32}
          color={Colors.TEXT}
          style={styles.iconOption}
          onPress={() => selectCaseImage()}
        />
        {/*<IconAnt
          name="videocamera"
          size={32}
          color={Colors.TEXT}
          style={styles.iconOption}
          onPress={() => selectCaseVideo()}
        />*/}
      </View>
      <GenericButton
        type="primary"
        title="Reportar Seguimiento"
        onPress={() => reportarSeguimiento()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    backgroundColor: Colors.GRAY_LIGHT,
    padding: 10,
  },
  iconRemove: {
    position: 'absolute',
    top: -8,
    left: 132,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
    width: '100%',
  },
  imagePreview: {
    height: 128,
    width: 128,
  },
  iconOption: {
    marginEnd: 15,
  },
});
