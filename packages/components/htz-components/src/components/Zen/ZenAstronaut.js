import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import Astronaut from '../illustrations/Astronaut/Astronaut';
import Button from '../Button/Button';
import IconClose from '../Icon/icons/IconClose';
import Section from '../AutoLevels/Section';
import H from '../AutoLevels/H';

const textWrapperStyle = ({ theme, }) => ({
  position: 'absolute',
  textAlign: 'center',
  left: '0',
  right: '0',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  marginBlockStart: '6rem',
  maxWidth: '35rem',
});

// eslint-disable-next-line react/prop-types
function ZenAstronaut({ onClose, }) {
  return (
    <FelaTheme
      render={theme => (
        <Section isFragment>
          <FelaComponent style={{ display: 'flex', alignItems: 'center', }}>
            <Button
              isFlat
              boxModel={{ hp: 1, vp: 1, }}
              onClick={onClose}
              variant="inverse"
              miscStyles={{
                display: 'inline-block',
                position: 'absolute',
                left: '0',
                top: '10%',
              }}
              attrs={{ id: 'myButton', }}
            >
              <IconClose
                size={7}
                color="white"
              />
            </Button>
            <Astronaut
              hideAstronaut
              size={[
                { until: 's', value: 60, },
                { from: 's', until: 'm', value: 70, },
                { from: 'm', until: 'l', value: 80, },
                { from: 'l', value: 85, },
              ]}
            />
            <FelaComponent rule={textWrapperStyle}>
              <FelaComponent
                style={{
                  color: 'white',
                  marginBottom: '2rem',
                  extend: [
                    theme.type(4, { fromBp: 'l', }),
                    theme.type(3, { fromBp: 's', untilBp: 'l', }),
                    theme.type(2, { untilBp: 's', }),
                  ],
                }}
              >
                <H>{theme.zenNonPayingUsers.title}</H>
              </FelaComponent>
              <Section>
                <FelaComponent
                  style={{
                    color: 'white',
                    marginBottom: '3rem',
                    extend: [
                      theme.type(3, { fromBp: 'l', }),
                      theme.type(2, { fromBp: 's', untilBp: 'l', }),
                      theme.type(1, { untilBp: 's', }),
                    ],
                  }}
                >
                  <p>{theme.zenNonPayingUsers.subTitle}</p>
                </FelaComponent>
              </Section>
              <Button
                href={theme.zenNonPayingUsers.buttonUrl}
                boxModel={{ hp: 3, vp: 1, }}
                variant="salesOpaque"
              >
                {theme.zenNonPayingUsers.button}
              </Button>
            </FelaComponent>
          </FelaComponent>
        </Section>
      )}
    />
  );
}
export default ZenAstronaut;
