/* --------------------------------- */
/* Styled Components for Login Pages */
/* --------------------------------- */

// Imports ---------------------------------------------
import { createComponent, FelaTheme, } from 'react-fela';

// Styles ----------------------------------------------
const Styles = {
  Content: {
    loginPageWrapper: () => ({
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    }),

    loginContentWrapper: () => ({
      flex: '1 0 auto',
    }),

    formWrapper: () => ({
      width: '414px',
      maxWidth: '95%',
      margin: '0 auto',
      '& label': {
        height: '35px',
        fontSize: '2rem',
        marginTop: '2rem !important',
      },
      '& h5': {
        fontSize: '2.3rem',
      },

      '@media (max-width: 768px)': {
        '& label': {
          fontSize: '2.7rem',
        },
        '& h5': {
          width: '70%',
          fontSize: '3rem',
        },
      },
    }),

    topLinks: () => ({
      display: 'flex',
      margin: '-10px auto 25px auto',
      border: 'solid 1px #0b7eb5',
      '>span': {
        flexGrow: '1',
        textAlign: 'center',
        color: '#0b7eb5',
        fontSize: '1.75rem',
        fontWeight: 'bold',
        '&.on': {
          backgroundColor: '#0b7eb5',
          color: '#fff',
          '>a': {
            cursor: 'default',
          },
        },
      },
    }),

    itemCenterer: () => ({
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      clear: 'both',
      '> h5, button': {
        margin: '25px 0',
        textAlign: 'center',
      },
    }),
  },

  GeneralLayout: {
    loginHeaderWrapper: () => ({
      display: 'flex',
      itemAlign: 'center',
      justifyContent: 'space-around',
      width: '1263px',
      maxWidth: '100%',
      margin: '0 auto 49px auto',
      padding: '23px 0 0 0',
    }),

    loginFooterWrapper: () => ({
      flexShrink: '0',
      width: '100%',
      height: '315px',
      marginTop: '55px',
      backgroundColor: '#00537a',
      color: '#ffffff',

      '@media (max-width: 768px)': {
        height: '150px',
      },
    }),
  },

  MiscLayout: {
    inputLinkButton: () => ({
      fontSize: '16px',
      color: '#0b7eb5',

      '> span': {
        float: 'left',
        marginTop: '-20px',
        cursor: 'pointer',
        fontSize: '2rem',
      },
    }),
  },
};

// Components ------------------------------------------
const LoginContentStyles = {
  PageWrapper: createComponent(Styles.Content.loginPageWrapper),
  ContentWrapper: createComponent(Styles.Content.loginContentWrapper),
  FormWrapper: createComponent(Styles.Content.formWrapper),
  TopLinks: createComponent(Styles.Content.topLinks),
  ItemCenterer: createComponent(Styles.Content.itemCenterer),
};

const LoginGeneralLayoutStyles = {
  HeaderWrapper: createComponent(Styles.GeneralLayout.loginHeaderWrapper),
  FooterWrapper: createComponent(Styles.GeneralLayout.loginFooterWrapper),
};

const LoginMiscLayoutStyles = {
  InputLinkButton: createComponent(Styles.MiscLayout.inputLinkButton),
};

// Export ----------------------------------------------
export { LoginContentStyles, LoginGeneralLayoutStyles, LoginMiscLayoutStyles, };
