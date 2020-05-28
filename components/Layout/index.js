import React from 'react';
import Footer from './Footer';
import Header from './Header';
import SkipLink from './SkipLink';
import PhaseBanner from './PhaseBanner';

const Layout = ({ children }) => (
  <>
    <SkipLink />
    <Header serviceName="Shared Plan" />
    <div className="govuk-width-container app-width-container">
      <PhaseBanner phase="beta" />
      <main
        className="govuk-main-wrapper app-main-class"
        id="content"
        role="main"
      >
        {children}
      </main>
    </div>
    <Footer />
  </>
);

export default Layout;
