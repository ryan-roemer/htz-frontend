// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

// import CommentsCount from '../../../CommentsCount/CommentsCount';
// import LiveUpdateView from '../../../LiveUpdateView/LiveUpdateView';
import getImageAssets from '../../../../utils/getImageAssets';
import GridItem from '../../../Grid/GridItem';
import Image from '../../../Image/Image';
import Teaser from '../../../Teaser/Teaser';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
// import TeaserRank from '../../../TeaserRank/TeaserRank';
// import getPictureAssets from '../../../../utils/getPictureAssets';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

type BenderItemProps = {
  data: TeaserDataType,
  lazyLoadImages: boolean,
  index: number,
  biAction: ?ListBiActionType,
};

BenderItem.defaultProps = {
  lazyLoadImages: true,
};

export default function BenderItem({
  data,
  lazyLoadImages,
  index,
  biAction,
}: BenderItemProps): React.Node {
  const itemId = data.representedContent == null ? data.contentId : data.representedContent;

  return (
    <Teaser
      data={data}
      onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
      isStacked={[ { from: 'l', value: true, }, ]}
    >
      <TeaserMedia
        width={1}
        // width={[ { until: 's', value: 18, }, { from: 's', until: 'l', value: 6 / 12, }, ]}
        data={data}
        isStacked={[ { from: 'l', value: true, }, ]}
        // miscStyles={{}}
        onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
      >
        <FelaTheme>
          {theme => (
            <Image
              data={data.image}
              lazyLoad={lazyLoadImages}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'vertical',
                sizes: [
                  { from: 'xl', size: '285px', },
                  { until: 'xl', size: '233px', },
                  { size: 'calc(100vw - 4rem)', },
                ],
                widths: [ 285, 233, ],
              })}
              onClick={
                biAction ? () => biAction({ index, articleId: data.representedContent, }) : null
              }
            />
          )}
        </FelaTheme>
      </TeaserMedia>
      <TeaserContent
        data={data}
        padding={[ { from: 's', until: 'l', value: [ 1, 2, 0, ], }, { from: 'l', value: [ 1, 0, 0, ], }, ]}
        footerPadding={[
          { from: 's', until: 'l', value: [ 1, 2, 1, ], },
          { from: 'l', until: 'xl', value: [ 1, 0, 1, ], },
        ]}
        isStacked={[ { from: 'l', value: true, }, ]}
        gridItemMiscStyles={{
          display: [ { from: 's', until: 'l', value: 'block', }, ],
        }}
        footerColor={[ 'neutral', '-3', ]}
        footerMiscStyles={{
          type: [
            { until: 's', value: -2, },
            { from: 's', until: 'xl', value: -2, },
            { from: 'xl', value: -3, },
          ],
        }}
        renderContent={() => (
          <TeaserHeader
            {...data}
            typeScale={[
              { until: 's', value: 0, },
              { from: 's', until: 'l', value: 1, },
              { from: 'l', value: 0, },
            ]}
            onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
          />
        )}
        renderFooter={() => (
          <GridItem>
            {data.authors ? (
              <span style={{ marginInlineEnd: '1rem', }}>
                <TeaserAuthors authors={data.authors} miscStyles={{ fontWeight: 'bold', }} />
              </span>
            ) : null}
          </GridItem>
        )}
      />
    </Teaser>
  );
}
