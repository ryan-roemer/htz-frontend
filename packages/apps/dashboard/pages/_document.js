import { createDocument, } from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import theme, { cssReset, fontStacks, } from '../theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';

// console.log('[_document] fontStacks: ', JSON.stringify(fontStacks));

const HaaretzDocument = createDocument({
  styleRenderer,
  lang: 'heb',
  FelaProvider: StyleProvider,
  theme,
  fontStacks,
  staticRules: [ cssReset, ],
  isRtl: true,
});
export default HaaretzDocument;
