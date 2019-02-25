// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';

import { TdComponent, } from '../AssetsTable/AssetsTable';
import { TableLink, } from '../SortableTable/SortableTable';
import SectionLink from '../SectionLink/SectionLink';

type Column = {
  name: string, // eslint-disable-line react/no-unused-prop-types
  title: string, // eslint-disable-line react/no-unused-prop-types
  styles: ?(any => StyleProps) | StyleProps, // eslint-disable-line react/no-unused-prop-types
  render: any => string, // eslint-disable-line react/no-unused-prop-types
};

type Props = {
  data: Array<any>,
  columns: Array<Column>,
  miscStyles: ?Object,
  addLink?: boolean,
  linkContent?: boolean,
  type?: ?string,
  subSection?: ?string,
  linkText?: ?string,
};

StaticTable.defaultProps = {
  addLink: false,
  linkContent: false,
  miscStyles: null,
  type: null,
  subSection: null,
  linkText: null,
};

function StaticTable({
  data,
  columns,
  miscStyles,
  linkContent,
  addLink,
  type,
  subSection,
  linkText,
}: Props): Node {
  return (
    <Fragment>
      <FelaComponent
        style={(theme: Object) => ({
          ...theme.type(-2),
          tableLayout: 'fixed',
          whiteSpace: 'nowrap',
          width: '100%',
          extend: [
            ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
          ],
        })}
        render="table"
      >
        <thead>
          <tr>
            {columns.map(({ title, name, }: Column) => (
              <TdComponent
                key={name}
                miscStyles={{
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  paddingStart: '2rem',
                }}
              >
                {title}
              </TdComponent>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(asset => (
            <FelaComponent
              key={asset[Object.keys(asset)[0]]}
              style={theme => ({
                backgroundColor: theme.color('neutral', '-10'),
                extend: [
                  borderBottom('2px', 1, 'solid', theme.color('neutral', '-6')),
                  ...(miscStyles
                    ? parseStyleProps(miscStyles, theme.mq, theme.type)
                    : []),
                ],
              })}
              render="tr"
            >
              {columns.map(({ name, styles, render, }: Column, index: number) => (
                <TdComponent
                  key={`${name}-${asset[Object.keys(asset)[0]]}`}
                  miscStyles={
                    typeof styles === 'function'
                      ? styles(asset[name])
                      : styles
                  }
                >
                  {
                    linkContent
                      ? (
                        <TableLink
                          allowTab={index === 0}
                          content={render(asset[name])}
                          assetId={asset.id}
                          type={asset.type}
                        />
                      )
                      : render(asset[name])
                  }
                </TdComponent>
              ))}
            </FelaComponent>
          ))}
        </tbody>
      </FelaComponent>
      {addLink ? (
        <SectionLink
          href={{
            pathname: `/${type || subSection || ''}`,
            query: {
              subSection,
            },
          }}
          as={type ? `/${type || ''}/${subSection || ''}` : `/${subSection || ''}`}
        >
          <span>{linkText || ''}</span>
        </SectionLink>
      ) : null}
    </Fragment>
  );
}

StaticTable.defaultProps = { miscStyles: null, };
export default StaticTable;
