import App, { Container, } from 'next/app';
import React from 'react';
import { ApolloProvider, } from 'react-apollo';
import { LevelProvider, } from './components/AutoLevels/LevelContext';

export default function createApp(AdditionalComponent) {
  return class NextApp extends App {
    componentDidCatch(error, errorInfo) {
      // This is needed to render errors correctly in development / production
      super.componentDidCatch(error, errorInfo);

      console.log(error);
      // TODO: recover from errors or redirect to error page
    }

    render() {
      const { Component, initialProps, apolloClient, router, } = this.props;
      return (
        <Container>
          <ApolloProvider client={apolloClient}>
            <LevelProvider value={1}>
              <Component {...initialProps} url={router} />
              {AdditionalComponent ? <AdditionalComponent /> : null}
            </LevelProvider>
          </ApolloProvider>
        </Container>
      );
    }
  };
}
