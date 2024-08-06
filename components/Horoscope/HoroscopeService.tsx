export const getZodiacSign = (birthday: string)=> {
  const date = new Date(birthday);

  const zodiacSigns = [
    { sign: 'aries', start: [3, 21], end: [4, 19] },
    { sign: 'taurus', start: [4, 20], end: [5, 20] },
    { sign: 'gemini', start: [5, 21], end: [6, 20] },
    { sign: 'cancer', start: [6, 21], end: [7, 22] },
    { sign: 'leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'libra', start: [9, 23], end: [10, 22] },
    { sign: 'scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'sagittarius', start: [11, 22], end: [12, 21] },
    { sign: 'capricorn', start: [12, 22], end: [1, 19] },
    { sign: 'aquarious', start: [1, 20], end: [2, 18] },
    { sign: 'pisces', start: [2, 19], end: [3, 20] },
  ];

  const month = date.getMonth() + 1; 
  const day = date.getDate();

  for (const zodiac of zodiacSigns) {
    const { sign, start, end } = zodiac;
    const [startMonth, startDay] = start;
    const [endMonth, endDay] = end;

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (month > startMonth && month < endMonth) ||
      (month === endMonth && day <= endDay)
    ) {
      return sign;
    }
  }

  return 'Fecha no válida';
};

