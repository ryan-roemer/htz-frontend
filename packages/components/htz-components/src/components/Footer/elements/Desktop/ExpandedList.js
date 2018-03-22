import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Link from '../../../Link/Link';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import { ColumnTypes, PairTypes, } from './DesktopElementPropTypes';

const extendedListContainerStyle = ({
  theme: { color, footerBorderStyle: { borderWidth, lines, borderStyle, }, },
  showMe,
}) => ({
  display: showMe ? 'flex' : 'none',
  backgroundColor: color('footer', 'bg'),
  alignItems: 'baseline',
  paddingBottom: '6rem',
  marginBottom: '2rem',
  ...borderBottom(borderWidth, 0, borderStyle, color('footer', 'border')),
});

const ExtendedFooterContainer = createComponent(extendedListContainerStyle);

const listUlStyle = ({ theme, }) => ({
  ...theme.mq({ from: 'xl', }, { marginInlineEnd: '8rem', }),
  marginBottom: '2rem',
});

const StyledSection = createComponent(listUlStyle, 'section');

const titleLiStyle = ({ theme, }) => ({
  fontWeight: 'bold',
});

const StyledUlTitle = createComponent(titleLiStyle, 'h4');

const ulBodyStyle = ({ theme, }) => ({
  // marginBottom: '1rem',
});

const StyledUlBody = createComponent(ulBodyStyle, 'ul');

const listLinkStyle = ({ theme, isLast, isBold = false, }) => ({
  ...(isBold ? { fontWeight: 'bold', } : {}),
  extend: [ theme.type(-1), ],
});

const StyledListLink = createComponent(listLinkStyle, Link, [
  'content',
  'href',
  'focus',
]);

const toolboxListStyle = () => ({
  // minWidth: '20rem',
});

const StyledToolboxList = createComponent(toolboxListStyle, 'ul');

ExpandedList.propTypes = {
  /** Footer's array of columns data */
  columnsArr: PropTypes.arrayOf(ColumnTypes).isRequired,
  /** Indicates display mode */
  showMe: PropTypes.bool.isRequired,
  /** Footer's toolbox data */
  toolbox: PairTypes.isRequired,
};

function ExpandedList({ columnsArr, toolbox, showMe, }) {
  return (
    <ExtendedFooterContainer showMe={showMe}>
      <Grid>
        <GridItem
          width={[
            { from: 'm', until: 'l', value: 2 / 3, },
            { from: 'l', until: 'xl', value: 4 / 5, },
            { from: 'xl', value: 5 / 6, },
          ]}
        >
          <Grid>
            {columnsArr.map((lists, colIdx) => (
              // eslint-disable-next-line react/no-array-index-key
              <GridItem
                width={[
                  { from: 'm', until: 'l', value: 1 / 2, },
                  { from: 'l', until: 'xl', value: 1 / 4, },
                  { from: 'xl', value: 1 / 5, },
                ]}
                // eslint-disable-next-line  react/no-array-index-key
                key={colIdx}
              >
                {lists.map((innerList, listIdx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <StyledSection key={listIdx}>
                    <StyledUlTitle>{innerList.title}</StyledUlTitle>
                    <StyledUlBody>
                      {innerList.items.map((link, linkIdx) => (
                        <li key={`${link.text}${link.href}`}>
                          <StyledListLink
                            content={link.text}
                            href={link.href}
                          />
                        </li>
                      ))}
                    </StyledUlBody>
                  </StyledSection>
                ))}
              </GridItem>
            ))}
          </Grid>
        </GridItem>
        <GridItem
          width={[
            { from: 'm', until: 'l', value: 1 / 3, },
            { from: 'l', until: 'xl', value: 1 / 5, },
            { from: 'xl', value: 1 / 6, },
          ]}
        >
          <StyledToolboxList>
            {toolbox.map(link => (
              <li key={`${link.text}${link.href}`}>
                <StyledListLink content={link.text} href={link.href} isBold />
              </li>
            ))}
          </StyledToolboxList>
        </GridItem>
      </Grid>
    </ExtendedFooterContainer>
  );
}

export default ExpandedList;
