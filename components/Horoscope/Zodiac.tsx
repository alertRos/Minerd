// Zodiac.tsx
import { ImageSourcePropType } from 'react-native';

interface ZodiacSign {
  name: string;
  dateRange: string;
  image: ImageSourcePropType;
  element: ImageSourcePropType;
}

const zodiacSigns: Record<string, ZodiacSign> = {
  aries: {
    name: 'Aries',
    dateRange: '21 de marzo - 19 de abril',
    image: require('../../assets/horoscope/aries.png'),
    element: require('../../assets/horoscope/fire.png')
  },
  taurus: {
    name: 'Tauro',
    dateRange: '20 de abril - 20 de mayo',
    image: require('../../assets/horoscope/taurus.png'),
    element: require('../../assets/horoscope/earth.png')
  },
  gemini: {
    name: 'Géminis',
    dateRange: '21 de mayo - 20 de junio',
    image: require('../../assets/horoscope/gemini.png'),
    element: require('../../assets/horoscope/air.png')
  },
  cancer: {
    name: 'Cáncer',
    dateRange: '21 de junio - 22 de julio',
    image: require('../../assets/horoscope/cancer.png'),
    element: require('../../assets/horoscope/water.png')
  },
  leo: {
    name: 'Leo',
    dateRange: '23 de julio - 22 de agosto',
    image: require('../../assets/horoscope/leo.png'),
    element: require('../../assets/horoscope/air.png')
  },
  virgo: {
    name: 'Virgo',
    dateRange: '23 de agosto - 22 de septiembre',
    image: require('../../assets/horoscope/virgo.png'),
    element: require('../../assets/horoscope/earth.png')
  },
  libra: {
    name: 'Libra',
    dateRange: '23 de septiembre - 22 de octubre',
    image: require('../../assets/horoscope/libra.png'),
    element: require('../../assets/horoscope/air.png')
  },
  scorpio: {
    name: 'Escorpio',
    dateRange: '23 de octubre - 21 de noviembre',
    image: require('../../assets/horoscope/scorpio.png'),
    element: require('../../assets/horoscope/water.png')
  },
  sagittarius: {
    name: 'Sagitario',
    dateRange: '22 de noviembre - 21 de diciembre',
    image: require('../../assets/horoscope/sagittarius.png'),
    element: require('../../assets/horoscope/fire.png')
  },
  capricorn: {
    name: 'Capricornio',
    dateRange: '22 de diciembre - 19 de enero',
    image: require('../../assets/horoscope/capricorn.png'),
    element: require('../../assets/horoscope/earth.png')
  },
  aquarius: {
    name: 'Acuario',
    dateRange: '20 de enero - 18 de febrero',
    image: require('../../assets/horoscope/aquarius.png'),
    element: require('../../assets/horoscope/air.png')
  },
  pisces: {
    name: 'Piscis',
    dateRange: '19 de febrero - 20 de marzo',
    image: require('../../assets/horoscope/pisces.png'),
    element: require('../../assets/horoscope/water.png')
  },
};

export default zodiacSigns;
