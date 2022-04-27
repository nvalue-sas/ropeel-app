import React from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import GenericText from '../../componets/atoms/GenericText';
import {AuthContext} from '../../context';
import {USER_CASES} from '../../constants/RopeelAPI';
import {validUndefined} from '../../utils/StringUtils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '@styles/index';

export default function UserReportsView({navigation}) {
  const [reportCasesUser, serReportCasesUser] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const {userLoggedIn} = React.useContext(AuthContext);

  function getReportTitle(veh) {
    return (
      <View style={styles.status}>
        <GenericText type="h5" text={veh.licensePlate} />
        <GenericText
          type="h5"
          text={
            veh.status === 'A'
              ? ' ACTIVO'
              : veh.status === 'I'
              ? ' INACTIVO'
              : ' CANCELADO'
          }
          style={veh.status === 'A' ? styles.active : styles.inactive}
        />
      </View>
    );
  }

  function geTrackingsCases(rep) {
    navigation.navigate('TrackingReport', {
      report: rep,
    });
  }

  React.useEffect(() => {
    fetch(USER_CASES, {
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
          serReportCasesUser(apiData.userReportCases);
          setReload(!reload);
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
  }, [userLoggedIn, reload]);

  return (
    <ScrollView
      contentContainerStyle={
        typeof reportCasesUser !== 'undefined' && reportCasesUser.length > 0
          ? null
          : styles.emptyScrollView
      }>
      <View style={styles.container}>
        {typeof reportCasesUser !== 'undefined' &&
        reportCasesUser.length > 0 ? (
          <GenericText
            type="h5"
            text="Mis vehiculos reportados"
            style={styles.title}
          />
        ) : (
          <View style={styles.container1}>
            <Image
              source={require('@images/empty_reports.png')}
              style={styles.emptyImage}
            />
            <GenericText
              type="h4"
              text="Sin reportes"
              style={styles.emptyText}
            />
          </View>
        )}
        {reportCasesUser.map((l, i) => (
          <ListItem
            key={i}
            title={getReportTitle(l)}
            subtitle={
              <GenericText
                type="p"
                text={validUndefined(
                  [l.subtypeName, l.brand, l.referenceName, l.model],
                  ' ',
                )}
              />
            }
            leftIcon={<Icon name={l.subtypeIcon} color={l.color} size={24} />}
            bottomDivider
            chevron={{
              color: Colors.TEXT,
              onPress: () => geTrackingsCases(l),
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyScrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyImage: {
    width: 128,
    height: 128,
    marginBottom: 30,
  },
  emptyText: {
    color: '#454545',
  },
  title: {
    marginBottom: 10,
  },
  status: {
    flexDirection: 'row',
  },
  active: {
    color: Colors.SUCCESS,
  },
  inactive: {
    color: Colors.ALERT,
  },
});
