import React from 'react';
import Document, { Head, Main, NextScript, } from 'next/document';
import { renderToSheetList, } from 'fela-dom';
import config from 'config';
import serialize from 'serialize-javascript';

/**
 * The returned class should be exported as the default export in the
 * `pages/_document.js` file of a Next.js app.
 *
 * @param {object} options
 * @param {object} options.styleRenderer
 *   a react-fela renderer
 * @param {string|string[]} options.staticRules
 *   css string (or an array of) for Fela to render with `renderStatic`
 * @param {Component} options.StyleProvider
 *   The Fela style provider used in the app
 * @param {object} options.theme
 *   The Fela theme used in the app
 * @param {Array} options.fontRules
 *   An array of argument arrays for Fela's `renderFont`
 * @param {object} options.appData
 *   An application data object, defaults to just having
 *   a `config` field with data from the `config` module.
 *
 * @return {class} A Next.js `document` component
 */
const createDocument = ({
  styleRenderer,
  FelaProvider,
  theme,
  fontRules = [],
  staticRules = '',
  appData = { config, },
  isRtl,
}) =>
  class HaaretzDocument extends Document {
    static getInitialProps({ renderPage, }) {
      fontRules.forEach(rule => styleRenderer.renderFont(...rule));
      if (staticRules) {
        Array.isArray(staticRules)
          ? staticRules.forEach(rule => styleRenderer.renderStatic(rule))
          : styleRenderer.renderStatic(staticRules);
      }
      const page = renderPage(App => props => (
        <FelaProvider theme={theme} renderer={styleRenderer}>
          <App {...props} />
        </FelaProvider>
      ));
      const sheetList = renderToSheetList(styleRenderer);

      // styleRenderer.clear();
      return {
        ...page,
        sheetList,
        appData,
        isRtl,
      };
    }

    renderStyles() {
      return this.props.sheetList.map(
        ({ type, rehydration, support, media, css, }) => (
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css, }}
            data-fela-rehydration={rehydration}
            data-fela-support={support}
            data-fela-type={type}
            key={`${type}-${media}`}
            media={media}
          />
        )
      );
    }

    renderData() {
      return (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `__HTZ_DATA__ = ${serialize(this.props.appData)};`,
          }}
        />
      );
    }

    render() {
      return (
        <html lang={this.props.lang} dir={this.props.isRtl ? 'rtl' : 'ltr'}>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <link rel="shortcut icon" href="about:blank" />
            {this.renderStyles()}
            {this.renderData()}
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      );
    }
  };

export default createDocument;
