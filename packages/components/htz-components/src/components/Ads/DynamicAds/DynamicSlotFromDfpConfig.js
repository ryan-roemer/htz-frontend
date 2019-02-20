import { parseStyleProps, } from '@haaretz/htz-css-tools';
import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import DfpConfProvider from './DfpConfProvider';
import DynamicAdSlot from './DynamicAdSlot';
import getSectionPairFromLineage from '../utils/getSectionsFromLineage.js';


const DynamicSlotFromDfpConfig = ({ adSlotId, miscStyles, }) => (
  <DfpConfProvider>
    {
      data => {
        const slotConfig = data.dfpConfig.adSlotConfig[adSlotId];
        if (slotConfig) {
          const network = data.dfpConfig.adManagerConfig.network;
          const adUnitBase = data.dfpConfig.adManagerConfig.adUnitBase;
          const sectionIndicator = `${adSlotId}_section`;
          const [ section, subSection, ] = getSectionPairFromLineage(data.lineage)
            .map(s => s.toLowerCase());
          const adUnit = `${network}/${adUnitBase}/${adSlotId}/${sectionIndicator}/${sectionIndicator}.${section}/${sectionIndicator}.${section}.${subSection}`;
          return miscStyles ? (
            <FelaComponent
              style={(
                {
                  theme
                }
              ) => ({
                extend: [
                  ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
                ]
              })}
            >
              <DynamicAdSlot id={adSlotId} adUnit={adUnit} sizes={slotConfig.adSizeMapping} />
            </FelaComponent>) : (
              <DynamicAdSlot id={adSlotId} adUnit={adUnit} sizes={slotConfig.adSizeMapping} />
          );
        }
        return null;
      }

    }
  </DfpConfProvider>
);

DynamicSlotFromDfpConfig.propTypes = {
  adSlotId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  miscStyles: PropTypes.object,
};

DynamicSlotFromDfpConfig.defaultProps = {
  miscStyles: null,
};

export default DynamicSlotFromDfpConfig;
