/* eslint-disable react/no-unused-prop-types,no-script-url */
// @flow
import * as React from 'react';
import type { Node, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import ClickArea from '../../../ClickArea/ClickArea';

// / Flow types
type Props = {
  setGroup: (string, Object) => void,
  groupNumber: number,
  client: Object,
}

type State = {
  activeTab: number,
}

const barRule: Object => Object = ({ theme, }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'stretch',
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  extend: [
    theme.type(0),
  ],

});

const singleTabRule: Object => Object = ({ theme, active, }) => ({
  padding: '0.5 1.6rem',
  ':active': {
    outline: 'none',
    border: 'none',
  },
  background: active ? theme.color('quaternary', 'base') : theme.color('neutral', -10),
  fontWeight: active ? 700 : 500,
  color: theme.color('button', 'primaryOpaqueHoverBg'),
  extend: [
    theme.mq({ from: 's', }, { padding: '1rem 1.8rem', }),
    theme.mq({ until: 's', }, {
      padding: '0.5rem 2.8rem',
      ...theme.type(-1),
    }),
  ],
});

type SingleTabOptions = {
  text: string,
  active: boolean,
  index: number,
  handleClick: number => void,
}


function SingleTab({ text, active, index, handleClick, }: SingleTabOptions): Node {
  return (
    <FelaComponent
      active={active}
      rule={singleTabRule}
    >
      <ClickArea
        miscStyles={{ width: '100%',
          fontWeight: active ? 700 : 500, }}
        onClick={() => handleClick(index)}
      >
        {text}
      </ClickArea>
    </FelaComponent>
  );
}

class GroupBar extends React.Component <Props, State> {
  state = {
    activeTab: -1,
  };


  static getDerivedStateFromProps(props: Props, state: State) {
    return state.activeTab === -1 ? {
      activeTab: props.groupNumber - 1,
    }
      : state;
  }


  componentDidMount(): void {
    if (this.activeTab) {
      this.activeTab.focus();
    }
  }


  handleClick: number => void = tabNumber => {
    this.setState({ activeTab: tabNumber, });
    this.props.setGroup(String(tabNumber + 1), this.props.client);
  };

  activeTab: ?HTMLAnchorElement;

  render(): Node {
    return (
      <FelaComponent
        rule={barRule}
        render={({ className, }) => (
          <FelaTheme render={theme => (
            <div className={className}>

              {
              theme.groupBarTabs.headers.map((h, index) => {
                const active = this.state.activeTab === index;
                return active ? (
                  <a
                    href="javascript:void(0)"
                    style={{ flexGrow: '1', }}
                    ref={activeTab => { this.activeTab = activeTab; }}
                  >
                    <SingleTab
                      key={h}
                      index={index}
                      text={h}
                      active={active}
                      handleClick={this.handleClick}
                    />
                  </a>
                ) : (
                  <a
                    href="javascript:void(0)"
                    style={{ flexGrow: '1', }}
                  >
                    <SingleTab
                      key={h}
                      index={index}
                      text={h}
                      active={active}
                      handleClick={this.handleClick}
                    />
                  </a>
                );
              })
            }


            </div>
          )}
          />
        )}
      />
    );
  }
}

export default GroupBar;
