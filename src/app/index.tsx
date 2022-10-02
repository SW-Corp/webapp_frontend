/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';

import { RegistrationPage } from 'app/pages/RegistrationPage';

import { useTranslation } from 'react-i18next';
import { ForgotPasswPage } from './pages/ForgotPasswPage';
import { PasswordSentPage } from './pages/PasswordSentPage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        defaultTitle="Water Treatment Lab"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Water Treatment Lab" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/forgotPassword" render={ForgotPasswPage} />
        <Route path="/passwordSent" component={PasswordSentPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
