import React from 'react';
import { FelaComponent, } from 'react-fela';
import List from './List';

/*
  * A list Selector to view different lists.
  */
export default class ListSelector extends React.Component {
  static propTypes = {
    /**
     * List's contentId.
     */
    // contentId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    /**
     * List's view name.
     */
    // view: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  };

  state = {
    view: null,

    turnA: true,
  };

  onSelect = evt => {
    const view = evt.target.value;
    this.setState(prevState => ({
      view,
      turnA: !prevState.turnA,
    }));
  };

  render() {
    return (
      <div style={{ position: 'relative', }}>
        <FelaComponent
          style={{ appearance: 'menulist', }}
          render={({ className, }) => (
            <select
              name="viewType"
              onChange={this.onSelect}
              defaultValue="placeHolder"
              className={className}
            >
              <option value="placeHolder" disabled>
                {'Select a preview'}
              </option>
              <option value="Bender">Bender</option>
              <option value="Farnsworth">Farnsworth</option>
              <option value="Fry">Fry</option>
              <option value="Leela">Leela</option>
              <option value="Nibbler">Nibbler</option>
              <option value="Zoidberg">Zoidberg</option>
            </select>
          )}
        />
        {/* turnA is an ugly hack to cause the list to completely unmount an remount since List component has important stuff happening in componentDidMount */}
        {this.state.view && this.state.turnA ? (
          <List contentId={this.state.view} view={this.state.view} />
        ) : null}
        {this.state.view && !this.state.turnA ? (
          <List contentId={this.state.view} view={this.state.view} />
        ) : null}
      </div>
    );
  }
}
