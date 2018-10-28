/* eslint-disable import/no-unresolved */
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';

import GeneralAdSlot from '../../../Ads/GeneralAdSlot';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import Image from '../../../Image/Image';
import { PromotedItem, } from '../Leela/Leela.view';
import BlockLink from '../../../BlockLink/BlockLink';
import H from '../../../AutoLevels/H';
import HtzLink from '../../../HtzLink/HtzLink';
import Section from '../../../AutoLevels/Section';

const listItemStyle = {
  alignItems: 'flex-start',
  display: 'flex',
};

// eslint-disable-next-line react/prop-types
const ClickTrackerItem = ({ item, index, listId, biAction, }) => (
  <ClickTracker
    {...item}
    render={banner => {
      const { text, link, clicktrackerimage, } = banner;
      return (
        <FelaTheme
          render={theme => (
            <BlockLink
              miscStyles={{
                ...listItemStyle,
                marginTop: '1rem',
                borderTop: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
                borderBottom: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
                borderEnd: [ '5px', 0, 'solid', theme.color('neutral', '-4'), ],
              }}
              href={link}
              onClick={() => {
                biAction({
                  actionCode: 109,
                  additionalInfo: {
                    ArticleId: item.contentId,
                    ListId: listId,
                    Platform: 'desktop',
                    NoInList: index + 1,
                    ViewName: 'Zoidberg',
                  },
                });
              }}
            >
              <PromotedItem
                title={text}
                image={clicktrackerimage}
                path={link}
                suffix
                paragraphHeight={{ maxHeight: '9rem', }}
                textType={-2}
              />
            </BlockLink>
          )}
        />
      );
    }}
  />
);

// eslint-disable-next-line react/prop-types
const Item = ({ title, image, path, listId, index, biAction, listLength, }) => (
  <FelaTheme
    render={theme => (
      <BlockLink
        miscStyles={{
          ...listItemStyle,
          marginTop: index ? '1rem' : undefined,
          ...(index < listLength - 1
            // place separators only between items
            ? { borderBottom: [ '1px', '1', 'solid', theme.color('neutral', '-4'), ], }
            : {}
          ),
        }}
        href={path}
        onClick={() => {
          biAction({
            actionCode: 109,
            additionalInfo: {
              ArticleId: path.match(/(?:.*-?)(1\.\d+.*)/)[1],
              ListId: listId,
              Platform: 'desktop',
              NoInList: index + 1,
              ViewName: 'Zoidberg',
            },
          });
        }}
      >
        <Section isFragment>
          <FelaComponent
            style={{
              width: '18rem',
              flexShrink: '0',
              flexGrow: '0',
            }}
            render={({ className, theme, }) => (
              <span className={className}>
                <Image
                  data={image}
                  imgOptions={{
                    transforms: {
                      width: '125',
                      aspect: 'regular',
                      quality: 'auto',
                    },
                  }}
                  miscStyles={{
                    width: '18rem',
                    flexShrink: '0',
                    flexGrow: '0',
                  }}
                />
              </span>
            )}
          />
          <FelaComponent
            style={theme => ({
              fontWeight: '700',
              marginStart: '1rem',
              flexGrow: '1',
              extend: [ theme.type(-2), ],
            })}
            render={({ className, }) => (
              <H className={className}>
                <HtzLink href={path}>{title}</HtzLink>
              </H>
            )}
          />
        </Section>
      </BlockLink>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const Zoidberg = ({ list, lazyLoad, biAction, listId, }) => {
  const { title, items, } = list;
  const stdItemsLength = items.length && items.filter(item =>
    [ 'com.polobase.ClickTrackerBannersWrapper', 'com.polobase.DfpBannerElement', ].includes(item.inputTemplate) === false
  ).length;
  return (
    <FelaComponent
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: `${300 / 7}rem`,
      }}
    >
      <FelaComponent
        style={theme => ({
          ...theme.type(1),
          fontWeight: '700',
          color: theme.color('primary'),
          ...borderBottom('2px', 1, 'solid', theme.color('primary')),
          marginBottom: '2rem',
        })}
        render={({ className, }) => <H className={className}>{title}</H>}
      />
      <Section>
        {items.map((item, index) => (
          <ListItem key={item.contentId}>
            {item.inputTemplate ? (
              item.inputTemplate ===
              'com.polobase.ClickTrackerBannersWrapper' ? (
                <ClickTrackerItem
                  item={item}
                  index={index}
                  biAction={biAction}
                  listId={listId}
                />
              ) : item.inputTemplate === 'com.polobase.DfpBannerElement' ? (
                <GeneralAdSlot
                  {...item}
                  styleRule={{
                    ...listItemStyle,
                    marginTop: '1rem',
                  }}
                />
              ) : null
            ) : (
              <Item {...item} index={index} biAction={biAction} listId={listId} listLength={stdItemsLength} />
            )}
          </ListItem>
        ))}
      </Section>
    </FelaComponent>
  );
};

export default Zoidberg;
