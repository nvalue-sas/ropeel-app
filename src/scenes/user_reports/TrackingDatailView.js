import React from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import GenericText from '../../componets/atoms/GenericText';
import {REPORT_TRACKING, UPDATE_TRACKING} from '../../constants/RopeelAPI';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {Colors} from '@styles/index';

export default function TrackingDetailView({navigation, route}) {
  const {report} = route.params;
  const [trackigs, serTrackings] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [image, setImage] = React.useState([]);

  function updateStatus(tck, status) {
    let statusName = status === 'A' ? 'Aceptar' : 'Rechazar';
    Alert.alert(
      'Precaución',
      '¿Esta seguro de ' +
        statusName +
        ' este seguimiento para el caso reportado?',
      [
        {text: 'Cancelar'},
        {text: 'OK', onPress: () => fetchStatus(tck, status)},
      ],
      {
        cancelable: true,
      },
    );
  }

  function fetchStatus(trk, status) {
    fetch(UPDATE_TRACKING, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({trackingId: trk.id, status: status}),
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          console.log(apiData);
          setReload(true);
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

  function showImage(img) {
    setIsVisibleModal(true);
    setImage([
      {
        url: img,
      },
    ]);
  }

  React.useEffect(() => {
    console.log('pasa por reactuseEffect... ');
    fetch(REPORT_TRACKING, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({reportId: report.report}),
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          serTrackings(apiData.trackings);
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
  }, [reload, report.report]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.mainView}>
        <GenericText
          type="h3"
          text={report.subtypeName + ' - ' + report.licensePlate}
          style={styles.title}
        />
        {trackigs.map((l, i) => (
          <View key={i} style={styles.card}>
            <Avatar
              source={{
                uri: l.userAvatar,
              }}
              size="small"
              rounded
            />
            <View style={styles.cardText}>
              <GenericText type="h5" text={l.user} />
              <GenericText type="p" text={l.commentary} />
              {l.status === 'C' ? (
                <View style={styles.statusButtons}>
                  <Button
                    title="Aceptar"
                    type="clear"
                    titleStyle={styles.acceptButton}
                    onPress={() => updateStatus(l, 'A')}
                  />
                  <Button
                    title="Rechazar"
                    type="clear"
                    titleStyle={styles.rejectButton}
                    onPress={() => updateStatus(l, 'R')}
                  />
                </View>
              ) : (
                <View style={styles.statusButtons}>
                  <IconAnt
                    name={l.status === 'A' ? 'check' : 'close'}
                    size={18}
                    style={l.status === 'A' ? styles.accept : styles.reject}
                  />
                  <GenericText
                    type="h4"
                    text={l.status === 'A' ? 'Aceptado' : 'Rechazado'}
                    style={l.status === 'A' ? styles.accept : styles.reject}
                  />
                </View>
              )}
            </View>
            <Avatar
              source={{
                uri: l.image,
              }}
              size="large"
              onPress={() => showImage(l.image)}
            />
          </View>
        ))}
      </View>
      <Modal
        isVisible={isVisibleModal}
        style={styles.modal}
        onBackdropPress={() => setIsVisibleModal(false)}>
        <ImageViewer imageUrls={image} />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },

  mainView: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    padding: 20,
  },

  title: {
    textAlign: 'center',
  },

  card: {
    backgroundColor: Colors.WHITE,
    minHeight: 100,
    marginTop: 10,
    flexDirection: 'row',
    padding: 15,
  },

  cardText: {
    width: '70%',
    paddingStart: 15,
    paddingEnd: 15,
  },

  statusButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },

  acceptButton: {
    color: Colors.SUCCESS,
    marginEnd: 5,
  },

  rejectButton: {
    color: Colors.PRIMARY,
    marginStart: 5,
  },

  accept: {
    color: Colors.SUCCESS,
  },

  reject: {
    color: Colors.PRIMARY,
  },

  modal: {
    backgroundColor: Colors.BLACK,
  },
});
