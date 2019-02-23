import getColor from './getColor';

export default subscription => {
  switch (subscription) {
    case 'htz':
    case 'tm':
      return getColor('neutral', '-1');
    case 'hdc':
    case 'bundle':
      return getColor('neutral', '-10');
    default: return getColor('neutral', '-1');
  }
};
