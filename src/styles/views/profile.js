import {StyleSheet} from 'react-native';
import {Colors} from '@styles/index';

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: Colors.GRAY_LIGHT,
  },
  menuContainer: {
    alignSelf: 'flex-end',
    padding: 25,
    marginTop: 50,
  },
  menuText: {
    color: Colors.TEXT,
  },
  avatar: {
    alignSelf: 'center',
  },
  userBody: {
    alignItems: 'center',
    marginTop: 20,
  },
  options: {
    backgroundColor: '#eef1f8',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 30,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  version: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnCreateVehicle: {
    marginBottom: 20,
  },
  overlay: {
    justifyContent: 'center',
    width: '80%',
  },
  overlayContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 25,
  },
  overlayImage: {
    height: 128,
    width: 128,
  },
  overlaySuggest: {
    marginTop: 30,
    textAlign: 'center',
  },
  overlayInputContainer: {
    marginTop: 30,
    backgroundColor: Colors.GRAY_RGBA,
    borderColor: Colors.GRAY_SHADOW_LIGHT,
    margin: 0,
  },
  overlayInput: {
    color: Colors.TEXT,
    textAlign: 'center',
  },
  avatarModal: {
    margin: 0,
  },
  avatarModalContainer: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  avatarModalTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'flex-start',
    padding: 15,
  },
  avatarModalTitleText: {
    marginStart: 15,
  },
  avatarModalImages: {
    justifyContent: 'center',
  },
  avatarModalImagesBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatarImage: {
    padding: 10,
    margin: 5,
  },
  avatarImgSize: {
    width: 64,
    height: 64,
  },
  btnSaveAvatar: {
    marginBottom: 20,
  },
  avatarSelect: {
    backgroundColor: Colors.GRAY_RGBA,
  },
  avatarImgSelect: {
    width: 64,
    height: 64,
    opacity: 0.5,
  },
  picker: {
    backgroundColor: Colors.GRAY_RGBA,
    width: 290,
    marginBottom: 10,
  },
  feedbackContainer: {
    justifyContent: 'center',
  },
  feedbackBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 50,
  },
  feedbackText: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 30,
  },
  btnSaveFeedback: {
    marginBottom: 30,
  },
});

export default styles;
