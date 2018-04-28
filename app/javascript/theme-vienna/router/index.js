import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '../components/HelloWorld'
import HomePage from '../pages/HomePage'
import BuyPage from '../pages/BuyPage'
import RentPage from '../pages/RentPage'
import StandardPage from '../pages/StandardPage'
import PropertyDetails from '../pages/PropertyDetails'
import ContactUsPage from '../pages/ContactUsPage'
import GenericContainer from '../pages/GenericContainer'
// import ThemeGenerator from '../components/ThemeGenerator'

import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  // base: '/admin-vue/',
  routes: [{
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    // {
    //   path: '/theme',
    //   component: ThemeGenerator
    // },
    {
      path: '/:locale',
      name: 'landing',
      component: HomePage
    },
    {
      path: '/:locale/buy',
      name: 'buyPage',
      component: BuyPage
    },
    {
      path: '/:locale/rent',
      name: 'rentPage',
      component: RentPage
    },
    {
      path: '/:locale/contact-us',
      component: ContactUsPage
    },
    {
      path: '/:locale/p/:pageName',
      name: 'standardPageDetails',
      component: StandardPage
    },
    {
      path: '/:locale/properties/:saleOrRent/:propertyId',
      name: 'propertyDetails',
      component: PropertyDetails,
    },
    {
      path: '/:locale/properties/:saleOrRent/:propertyId/:slug',
      name: 'propertyDetailsWithSlug',
      component: PropertyDetails,
    }
    // {
    //   path: '/:locale',
    //   // name: 'site-page',
    //   component: GenericContainer,
    //   // redirect: { name: 'homePage' },
    //   children: [{
    //       path: '',
    //       name: 'homePage',
    //       component: HomePage,
    //     },
    //     {
    //       path: '/p',
    //       name: 'standardPage',
    //       component: GenericContainer,
    //       children: [{
    //         name: 'standardPageDetails',
    //         path: '/:pageName',
    //         component: HomePage
    //       }]
    //     }
    //   ]
    // }
  ]
})
