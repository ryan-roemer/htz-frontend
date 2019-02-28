// @flow
import * as React from 'react';
import {
  IconHaaretzHomepageMasthead,
  IconHaaretzLogo,
} from '@haaretz/htz-components';
import {
  type StyleProps,
  type ComponentPropResponsiveObject,
} from '@haaretz/htz-css-tools';

import getElements from '../../utils/getHomePageElements';

type Props = {
  content: Array<Object>,
};

type LogoProps = {
  miscStyles: ?StyleProps,
  size: ?number | ComponentPropResponsiveObject<number>[],
};

function Logo({ miscStyles, size, }: LogoProps): React.Node {
  return (
    <React.Fragment>
      <IconHaaretzLogo
        size={size}
        miscStyles={{
          display: [
            { until: 'l', value: 'block', },
            { from: 'l', value: 'none', },
          ],
          ...(miscStyles || {}),
        }}
      />
      <IconHaaretzHomepageMasthead
        size={size}
        miscStyles={{
          display: [
            { until: 'l', value: 'none', },
            { from: 'l', value: 'block', },
          ],
          ...(miscStyles || {}),
        }}
      />
    </React.Fragment>
  );
}

function HeaderSlot({ content, }: Props): React.Node {
  if (content) {
    return content.map(element => {
      const Element = getElements(element.inputTemplate);
      return (
        <Element
          key={element.contentId}
          {...element}
          {...(element.inputTemplate === 'com.htz.EditableNavigationElement'
            ? {
              pageType: 'homepage',
              rowBgc: 'transparent',
              logo: Logo,
            }
            : {})}
        />
      );
    });
  }
  return null;
}

export default HeaderSlot;
