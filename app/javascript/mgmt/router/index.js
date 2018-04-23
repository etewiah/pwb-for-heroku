import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../../mgmt/components/HelloWorld'
import PropertiesList from '../../mgmt/pages/properties/PropertiesList'
import SingleProperty from '../../mgmt/pages/properties/SingleProperty'
import PropertyLabels from '../../mgmt/pages/properties/PropertyLabels'
import SinglePropertyTab from '../../mgmt/pages/properties/SinglePropertyTab'
import GenericContainer from '../../mgmt/pages/GenericContainer'
import NewProperty from '../../mgmt/pages/properties/NewProperty'
// import SitePageDetails from '../../mgmt/pages/site-pages/SitePageDetails'
// import WebsiteSettings from '../../mgmt/pages/admin/website/Settings'
// import WebsiteLanguages from '../../mgmt/pages/admin/website/Languages'
// import WebsiteCss from '../../mgmt/pages/admin/website/Sitecss'
// import WebsiteFooter from '../../mgmt/pages/admin/website/Footer'
// import WebsiteFooter2 from '../../mgmt/pages/admin/website/Footer2'
// import Agency from '../../mgmt/pages/Agency'
// import AgencyDetails from '../../mgmt/pages/agency/AgencyDetails'
// import AgencyLocation from '../../mgmt/pages/agency/AgencyLocation'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/mgmt/',
  routes: [{
      path: '/',
      name: 'propertiesList',
      component: PropertiesList
      // },
      // {
      //   path: '/agency',
      //   component: Agency,
      //   name: 'agency',
      //   redirect: {
      //     name: 'agencyDetails'
      //   },
      //   children: [{
      //     path: 'details',
      //     component: AgencyDetails,
      //     name: 'agencyDetails',
      //   }, {
      //     path: 'location',
      //     component: AgencyLocation,
      //     name: 'agencyLocation',
      //   }, ]
      // },
      // {
      //   path: '/website/settings',
      //   component: WebsiteSettings,
      //   children: [{
      //     path: '',
      //     name: 'adminWebsiteSettings',
      //   }, ]
      // },
      // {
      //   path: '/website/languages',
      //   component: WebsiteLanguages,
      //   children: [{
      //     path: '',
      //     name: 'adminWebsiteLanguages',
      //   }, ]
      // },
      // {
      //   path: '/website/sitecss',
      //   component: WebsiteCss,
      //   children: [{
      //     path: '',
      //     name: 'adminWebsiteCss',
      //   }, ]
      // },
      // {
      //   path: '/website/footer',
      //   component: WebsiteFooter,
      //   children: [{
      //     path: '',
      //     name: 'adminWebsiteFooter',
      //   }, ]
      // },
      // {
      //   path: '/website/footer2',
      //   component: WebsiteFooter2,
      //   children: [{
      //     path: '',
      //     name: 'adminWebsiteFooter2',
      //   }, ]
      // },
      // {
      //   path: '/site-pages/:pageName',
      //   // name: 'site-page',
      //   component: GenericContainer,
      //   // redirect: { name: 'single-page-tab' },
      //   children: [{
      //       path: '',
      //       name: 'sitePageDetailsDefault',
      //       component: SitePageDetails,
      //     },
      //     {
      //       path: ':tabName',
      //       name: 'site-page-details',
      //       component: SitePageDetails,
      //       // children: [{
      //       //   name: 'single-page-tab',
      //       //   path: ':tabName',
      //       //   component: SitePageDetails
      //       // }]
      //     }
      //   ]
    }, {
      path: '/properties',
      name: 'properties',
      redirect: {
        name: 'propertiesList'
      }
    }, {
      path: '/properties/view',
      component: GenericContainer,
      children: [{
        path: '',
        name: 'propertiesList',
        component: PropertiesList
      }, {
        path: ':id',
        component: SingleProperty,
        children: [{
          name: 'singleProperty',
          path: '',
          redirect: to => {
            const {
              params
            } = to
            // const { hash, params, query } = to
            // This will not trigger if I route to 'singleProperty' within app
            return {
              name: 'singlePropertyTab',
              params: {
                tabName: 'general',
                id: params.id
              }
            }
            // if (query.to === 'foo') {
            //   return { path: '/foo', query: null }
            // }
          } // redirect: { name: 'singlePropertyTab', params: {tabName: 'general'} }
        }, {
          name: 'singlePropertyTab',
          path: ':tabName',
          component: SinglePropertyTab
        }]
      }]
    },
    {
      path: '/properties/new',
      name: 'newProperty',
      component: NewProperty,
    }, {
      path: '/properties/labels',
      component: GenericContainer,
      children: [{
        path: '',
        name: 'defaultPropertyLabel',
        redirect: to => {
          const {
            params
          } = to
          return {
            name: 'propertyLabels',
            params: {
              labelName: 'features'
            }
          }
        }
      }, {
        name: 'propertyLabels',
        path: ':labelName',
        component: PropertyLabels,
        children: []
      }]
      // },

    }
  ]
})