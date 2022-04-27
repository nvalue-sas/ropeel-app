import * as React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {ACT_BRANDS} from '../../constants/RopeelAPI';
import GenericText from '../../componets/atoms/GenericText';
import {Colors} from '@styles/index';

export default function VehicleBrands({route, navigation}) {
  const {vehicleInfo} = route.params;
  const [search, setSearch] = React.useState('');
  const [apiBrands, setApiBrands] = React.useState([]);
  const [brands, setbrands] = React.useState([]);
  const [brandCode, setbrandCode] = React.useState(null);

  function searchBrand(brandSearch) {
    setSearch(brandSearch);
    let brand = brandSearch.toUpperCase();
    let result = apiBrands.filter(
      item => item.name.toUpperCase().indexOf(brand) >= 0,
    );
    setbrands(result);
  }

  function selectBrand(brandSelect) {
    setbrandCode(brandSelect.code);
    navigation.navigate('VehicleAddInfo', {
      vehicleInfo: {
        nvgUser: vehicleInfo.nvgUser,
        nvgVehicleHist: vehicleInfo.nvgVehicleHist,
        nvgTypeCode: vehicleInfo.nvgTypeCode,
        nvgSubtypeCode: vehicleInfo.nvgSubtypeCode,
        nvgSubtypeIcon: vehicleInfo.nvgSubtypeIcon,
        nvgColor: vehicleInfo.nvgColor,
        nvgPlate: vehicleInfo.nvgPlate,
        nvgBrandCode: brandSelect.code,
        nvgReferenceId: vehicleInfo.nvgReferenceId,
        nvgModel: vehicleInfo.nvgModel,
      },
    });
  }

  React.useEffect(() => {
    fetch(ACT_BRANDS, {
      method: 'GET',
    })
      .then(apiResponse => apiResponse.json())
      .then(apiData => {
        if (apiData.logType === 'success') {
          setApiBrands(apiData.brands);
          setbrands(apiData.brands);
          if (
            typeof vehicleInfo.nvgBrandCode !== 'undefined' &&
            vehicleInfo.nvgBrandCode !== null
          ) {
            setbrandCode(vehicleInfo.nvgBrandCode);
          }
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch(errorFetch => {
        console.error(errorFetch);
      });
  }, [vehicleInfo.nvgBrandCode]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Busca tu marca..."
        value={search}
        onChangeText={e => searchBrand(e)}
        lightTheme={true}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.brandsContainer}>
          <View style={styles.body}>
            {brands.map((l, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  selectBrand(l);
                }}>
                <View
                  style={[
                    styles.brand,
                    l.code === brandCode ? styles.buttonPress : styles.button,
                  ]}>
                  <Image source={{uri: l.image}} style={styles.img} />
                  <GenericText type="h5" text={l.name} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAY_LIGHT,
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    marginTop: 20,
    padding: 0,
    width: '80%',
  },
  searchInputContainer: {
    backgroundColor: Colors.GRAY,
    //borderColor: Colors.GRAY_SHADOW_LIGHT,
  },
  searchInput: {},
  scrollView: {
    marginTop: 20,
  },
  brandsContainer: {
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  brand: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    height: 140,
    justifyContent: 'center',
    margin: 10,
    position: 'relative',
    width: 140,
  },
  img: {
    height: 90,
    marginBottom: 10,
    width: 90,
  },
  button: {},
  buttonPress: {
    borderWidth: 1,
    borderColor: Colors.GRAY_DARK,
    backgroundColor: Colors.GRAY_RGBA,
  },
});
