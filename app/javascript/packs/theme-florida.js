/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue'
import Vuetify from "vuetify"
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import App from '@jsroot/packs/theme-florida/App.vue'
import store from "../theme-vienna/store"
import router from "../theme-vienna/router"
import i18n from "../theme-vienna/i18n"
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
    // TODO - inject key via server side
    key: 'AIzaSyCPorm8YzIaUGhKfe5cvpgofZ_gdT8hdZw',
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

Vue.use(Vuetify, {
  theme: {
    primary: "#4286f4",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  }
});


document.addEventListener('DOMContentLoaded', () => {
  // const el = document.body.appendChild(document.createElement('hello'))
  const app = new Vue({
    el: "#pwb-app",
    router,
    store,
    i18n,
    render: h => h(App)
  })

  // export const app = new Vue({
  //   el: "#app",
  //   router,
  //   store,
  //   i18n,
  //   components: { App },
  //   template: "<App/>"
  // });
  console.log(app)
})

// Vue.config.productionTip = false

// Useful for debugging
// window['vue'] = app
// window.store = store


// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the using turbolinks, install 'vue-turbolinks':
//
// yarn add 'vue-turbolinks'
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks';
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })