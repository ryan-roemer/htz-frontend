import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import TopNews from '../TopNews';

const links = [
  {
    href: '1.6651560',
    toolTip: 'הסלמה בדרום',
    inputTemplate: 'com.tm.Link',
    contentId: '7.3886266',
    contentName: 'הסלמה בדרום',
  },
  {
    href: '1.6652256',
    toolTip: 'בחירות מקומיות - סיבוב שני',
    inputTemplate: 'com.tm.Link',
    contentId: '7.3912299',
    contentName: 'בחירות מקומיות - סיבוב שני',
  },
  {
    href: '1.6652098',
    toolTip: 'משה ליאון',
    inputTemplate: 'com.tm.Link',
    contentId: '7.3885726',
    contentName: 'משה ליאון',
  },
  {
    href: '1.6651765',
    toolTip: 'סטן לי',
    inputTemplate: 'com.tm.Link',
    contentId: '7.3885217',
    contentName: 'סטן לי',
  },
  {
    href: '1.6633616',
    toolTip: 'יום הרווקים הסיני ',
    inputTemplate: 'com.tm.Link',
    contentId: '7.3762113',
    contentName: 'יום הרווקים הסיני ',
  },
  {
    href: '1.6652100',
    toolTip: 'הפודקאסט השבועי',
    className: 'c-brand--c',
    inputTemplate: 'com.tm.Link',
    contentId: '7.4064771',
    contentName: 'הפודקאסט השבועי',
  },
];

describe('<TopNews>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<TopNews links={links} />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<TopNews links={links} className="htz-a" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
