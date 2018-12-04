import React from 'react';
import { FelaTheme, createComponent, } from 'react-fela';

const wrapperStyle = () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255,255,255,0.8)',
  zIndex: '10',
});

const Wrapper = createComponent(wrapperStyle);

const Preloader = (props) => {
  return props.isLoading ? (
    <Wrapper>
      
    </Wrapper>
  ) : null;
}

export default Preloader;
