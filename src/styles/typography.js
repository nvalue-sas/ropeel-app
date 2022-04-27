import { Platform } from 'react-native';
// FONT FAMILY
export const FONT_FAMILY_LIGHT = Platform.select({ios: 'Airbnb Cereal App Light', android: 'AirbnbCerealLight'});
export const FONT_FAMILY_BOOK = Platform.select({ios:'Airbnb Cereal App Book', android:'AirbnbCerealBook'});
export const FONT_FAMILY_MEDIUM = Platform.select({ios:'Airbnb Cereal App Medium', android:'AirbnbCerealMedium'});
export const FONT_FAMILY_BLACK = Platform.select({ios:'Airbnb Cereal App Black', android:'AirbnbCerealBlack'});
export const FONT_FAMILY_BOLD = Platform.select({ios:'Airbnb Cereal App Bold', android:'AirbnbCerealBold'});
export const FONT_FAMILY_EXTRA_BOLD = Platform.select({ios:'Airbnb Cereal App Extra Bold', android:'AirbnbCerealExtraBold'});
