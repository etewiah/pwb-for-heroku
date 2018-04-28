import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import i18n from './i18n/'
// import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import * as VueGoogleMaps from 'vue2-google-maps'
// import fontawesome from "@fortawesome/fontawesome"
// import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
// import webfonts from "@fortawesome/fontawesome-free-webfonts"
// import brands from "@fortawesome/fontawesome-free-brands"
// import solid from "@fortawesome/fontawesome-free-solid"

import SocialSharing from "vue-social-sharing"

Vue.use(SocialSharing)

// Vue.use(FontAwesomeIcon)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCPorm8YzIaUGhKfe5cvpgofZ_gdT8hdZw',
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

Vue.use(Vuetify, {
  theme: {
      primary: '#eeeeee',
      secondary: '#eeeeee',
      accent: '#eeeeee',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
    // }
    // {
    // primary: "#8E24AA",
    // secondary: "#e57373",
    // accent: "#9c27b0",
    // error: "#f44336",
    // warning: "#ffeb3b",
    // info: "#2196f3",
    // success: "#4caf50"
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

// Useful for debugging
// window['vue'] = app
// window.store = store
