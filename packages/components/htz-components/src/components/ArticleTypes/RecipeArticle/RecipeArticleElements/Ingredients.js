import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';

const propTypes = {
  ingredientLists: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};
const defaultProps = {};

function Ingredients({ ingredientLists, }) {
  return (
    <FelaComponent
      style={({ theme, }) => ({
        marginTop: '4rem',
        maxWidth: theme.articleStyle.body.maxWidth,
        marginRight: 'auto',
        marginLeft: 'auto',
      })}
    >
      {({ theme, className, }) => (
        <Section className={className}>
          <FelaComponent
            style={{
              fontWeight: 'bold',
              color: theme.color('primary'),
              marginBottom: '3rem',
              maxWidth: '41rem',
              extend: [ theme.type('2'), borderBottom('2px', 1, 'solid', theme.color('primary')), ],
            }}
          >
            {({ className, }) => (
              <H className={className}>{theme.recipeIngredientsI18n.sectionTitle}</H>
            )}
          </FelaComponent>
          <Section>
            {ingredientLists.map((list, idx) => (
              <FelaComponent
                style={{ marginTop: idx !== 0 ? '2rem' : 0, }}
                key={list.header || list.ingredients[0]}
              >
                {list.header ? (
                  <FelaComponent
                    style={{
                      fontWeight: 'bold',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {({ className, }) => <H>{list.header}</H>}
                  </FelaComponent>
                ) : null}
                <FelaComponent style={{ paddingInlineStart: '1rem', }} as="ul">
                  {list.ingredients.map(ingredient => (
                    <FelaComponent
                      key={ingredient}
                      style={{
                        paddingInlineStart: '1em',
                        ':before': {
                          marginInlineStart: '-1em',
                          marginInlineEnd: '0.5em',
                          transform: 'translateY(-50%)',
                          display: 'inline-block',
                          content: '""',
                          borderRadius: '50%',
                          height: '0.9rem',
                          width: '0.9rem',
                          backgroundColor: theme.color('neutral', '-3'),
                        },
                        extend: [ theme.type(-2), ],
                      }}
                      as="li"
                    >
                      <FelaComponent
                        style={{
                          extend: [
                            theme.type(1, { untilBp: 'xl', lines: 5, }),
                            theme.type(0, { fromBp: 'xl', lines: 5, }),
                          ],
                        }}
                        as="span"
                      >
                        {ingredient}
                      </FelaComponent>
                    </FelaComponent>
                  ))}
                </FelaComponent>
              </FelaComponent>
            ))}
          </Section>
        </Section>
      )}
    </FelaComponent>
  );
}

Ingredients.propTypes = propTypes;
Ingredients.defaultProps = defaultProps;

export default Ingredients;
