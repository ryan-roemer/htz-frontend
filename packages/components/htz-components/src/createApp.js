import App, { Container, } from 'next/app';
import React from 'react';
import { ApolloProvider, } from 'react-apollo';
import { LevelProvider, } from './components/AutoLevels/LevelContext';

const createApp = () =>
  class NextApp extends App {
    render() {
      const { Component, initialProps, apolloClient, router, } = this.props;
      return (
        <Container>
          <ApolloProvider client={apolloClient}>
            <LevelProvider value={1}>
              <Component {...initialProps} url={router} />
            </LevelProvider>
          </ApolloProvider>
        </Container>
      );
    }
  };

export default createApp;
