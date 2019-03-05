// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import content from './content_type';
import changeableElementGroup from './changeable_element_group_type';
import MarketingToolSideBox from './marketing_tools_side_box_type';
import getInputTemplate from '../getInputTemplate';

const SideBar = new GraphQLList(
  new GraphQLUnionType({
    name: 'SideBar',
    types: [ content, changeableElementGroup, MarketingToolSideBox, ],
    resolveType: value => (value.inputTemplate === getInputTemplate('ChangeableElementGroup')
      ? changeableElementGroup
      : value.inputTemplate === getInputTemplate('MarketingToolSideBox')
        ? MarketingToolSideBox
        : content),
  })
);

export default SideBar;
