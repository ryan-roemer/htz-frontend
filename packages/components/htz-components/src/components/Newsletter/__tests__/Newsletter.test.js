import React from 'react';
import toJson from 'enzyme-to-json';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import NewsletterWithoutApollo from '../NewsletterWithoutApollo';
import NewsletterConfirmed from '../elements/NewsletterConfirmed';

Math.random = jest.fn(() => 123456789);
const mockFunc = jest.fn();

describe('<Newsletter />', () => {
  describe('Newsletter DOM element', () => {
    it('should correctly render a Newsletter initial view', () => {
      const wrapper = felaMount(
        <NewsletterWithoutApollo
          buttonText="הרשמה"
          headlineText="headline text"
          loading={false}
          signUpNewsletter={mockFunc}
          miscStyles={{
            maxWidth: '80rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          segmentId={1420800}
          variant="highlight"
        />
      );
      expect(toJson(wrapper, { mode: 'shallow', })).toMatchSnapshot();
    });
  });
  describe('NewsletterConfirmed DOM element', () => {
    it('should correctly render a NewsletterConfirmed without any props', () => {
      const { component, styles, } = felaSnapshotter(
        <NewsletterConfirmed closeConfirmation={mockFunc} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
