// @flow
import React from 'react';

import type { ComponentType, } from 'react';

import Media from '../Media/Media';
import useGetComponent from '../../hooks/GetComponentContext/useGetComponent';

type Props = {
  lists: Array<Object>,
};

function MobileListWrapper({ lists, }: Props) {
  const getComponent = useGetComponent();
  return (
    <div>
      <Media
        query={{ until: 's', }}
        render={() => lists.map(list => {
          const Element: ComponentType<Object> = getComponent(
            list.inputTemplate
          );
          return <Element key={list.contentId} {...list} />;
        })
        }
      />
    </div>
  );
}

export default MobileListWrapper;
