import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import VisuallyHidden from '../VisuallyHidden';

describe('VisuallyHidden component', () => {
  it('renders correctly', () => {
    const snapshot = felaSnapshotter(
      <VisuallyHidden id="my-div-description">
        This text describes the container
      </VisuallyHidden>
    );
    expect(snapshot).toMatchSnapshot();
  });
});
