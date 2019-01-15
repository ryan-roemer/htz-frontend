// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import Teaser from '../../../Teaser/Teaser';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import Picture from '../../../Image/Picture';
import getPictureAssets from '../../../../utils/getPictureAssets';

import TeaserFooter from './TeaserFooter';

import type { DisplayFlagsType, } from './TeaserFooter';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

type Props = {
  itemData: TeaserDataType,
  lazyLoadImages: boolean,
  displayFlags: DisplayFlagsType,
  biAction: ?ListBiActionType,
};

VerticalImageTeaser.defaultProps = {
  lazyLoadImages: true,
  biAction: null,
};

const headerType = [
  { until: 's', value: -1, },
  { from: 's', until: 'xl', value: 0, },
  { from: 'xl', value: -1, },
];

export default function VerticalImageTeaser({
  itemData,
  lazyLoadImages,
  biAction,
  displayFlags,
}: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={itemData}
          onClick={
            biAction
              ? () => biAction({ index: 1, articleId: itemData.contentId, })
              : null
          }
          gridMiscStyles={{ flexDirection: [ { from: 's', value: 'column', }, ], }}
          miscStyles={{
            borderBottom: [
              {
                from: 's',
                value: [ '1px', 1, 'solid', theme.color('neutral', '-6'), ],
              },
            ],
          }}
        >
          <TeaserMedia
            data={itemData}
            width={[ { until: 's', value: 17, }, ]}
            miscStyles={{ flexGrow: [ { from: 's', value: 0, }, ], }}
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...(itemData.image
                ? getPictureAssets({
                  bps: theme.bps,
                  imgData: itemData.image,
                  defaultImgOptions: {
                    sizes: '102px',
                    aspect: 'square',
                    widths: [ 102, ],
                  },
                  sources: [
                    {
                      from: 's',
                      aspect: 'headline',
                      sizes: [
                        { from: 'xl', size: '180px', },
                        { from: 'l', size: '225px', },
                        { from: 's', size: '166px', },
                      ],
                      widths: [ 166, 180, 225, ],
                    },
                  ],
                })
                : {})}
            />
          </TeaserMedia>
          <TeaserContent
            data={itemData}
            padding={[ 1, 0, 0, ]}
            footerPadding={[ 1, 0, 0, ]}
            gridItemMiscStyles={{ flexBasis: [ { from: 's', value: 'auto', }, ], }}
            renderContent={() => (
              <TeaserHeader
                {...itemData}
                typeScale={headerType}
                kickerTypeScale={headerType}
              />
            )}
            footerMiscStyles={{ type: -3, color: theme.color('neutral', '-3'), }}
            renderFooter={() => (
              <TeaserFooter data={itemData} displayFlags={displayFlags} />
            )}
          />
        </Teaser>
      )}
    />
  );
}
