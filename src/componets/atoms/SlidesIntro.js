import {Colors, Typography} from '@styles/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  slideTitle: {
    color: Colors.TEXT,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 22,
  },
  slideText: {
    color: Colors.TEXT,
    fontFamily: Typography.FONT_FAMILY_BOOK,
    fontSize: 18,
  },
});

const slides = [
  {
    key: 'rplSlide1',
    title: 'Ropeel',
    titleStyle: styles.slideTitle,
    text: '¡Aplicación de seguridad colaborativa!',
    textStyle: styles.slideText,
    image: require('@images/ropeel.png'),
    imageStyle: {width: 128, height: 128},
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  {
    key: 'rplSlide2',
    title: '¿Perdiste Tu vehiculo?',
    titleStyle: styles.slideTitle,
    text: 'En la comunidad Ropeel intentaremos ayudarte a recuperarlo',
    image: require('@images/thief.png'),
    textStyle: styles.slideText,
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  {
    key: 'rplSlide3',
    title: 'Encuentra tu vehiculo',
    titleStyle: styles.slideTitle,
    text:
      'Reporta el caso de perdida y recibe notificaciones de la ubicación de tu vehiculo',
    image: require('@images/pin.png'),
    textStyle: styles.slideText,
    backgroundColor: Colors.GRAY_MEDIUM,
  },
];

export default slides;
