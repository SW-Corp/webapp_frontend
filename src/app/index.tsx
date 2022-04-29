/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';

import { RegistrationPage } from 'app/pages/RegistrationPage';

import { useTranslation } from 'react-i18next';
import { ForgotPasswPage } from './pages/ForgotPasswPage';
import { PassworsSentPanel } from './components/PasswordSentPanel';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/forgotPassword" component={ForgotPasswPage} />
        <Route path="/passwordSent" component={PassworsSentPanel} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
