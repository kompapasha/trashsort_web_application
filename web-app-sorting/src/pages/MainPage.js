import React from 'react';
import ComponentBenefits from '../components/aboutComp/Benefits';
import ComponentMaps from '../components/mapComp/Maps';
import ComponentProcess from '../components/processComp/Process';
import FooterComponent from '../components/footerComp/Footer';
import HeaderComponent from '../components/headerComp/Header';
import ComponentBlog from '../components/blogComp/Blog';
import ComponentLoginForm from '../components/loginFormComp/Form';

function MainPage() {
  return (
    <>
      <HeaderComponent />
      <ComponentLoginForm />
      <ComponentProcess />
      <ComponentBenefits />
      <ComponentBlog />
      <ComponentMaps />
      <FooterComponent />
    </>
  );
}

export default MainPage;